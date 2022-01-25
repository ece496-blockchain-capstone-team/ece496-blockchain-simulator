import React from 'react';
import { render, screen } from '@testing-library/react';
import BlockObj from '../../services/Block';
import ChainView from './Chain';
import ChainObj from '../../services/Chain';

const NUM_TEST_BLOCKS = 10;

/**
 * Creates a chain of size numberOfBlocks blocks (including genesis block)
 * @param numberOfBlocks number of blocks in chain
 * @returns ChainObj initial chain setup
 */
function setupChain(numberOfBlocks: number): ChainObj {
  let chain = new ChainObj();
  for (let i = 1; i < numberOfBlocks; i++) {
    chain.addBlock('block data for block: ' + i);
  }
  return chain;
}

test('renders test paragraph for chain view', () => {
  render(<ChainView />);
  const element = screen.getByText(/chain view/i);
  expect(element).toBeInTheDocument();
});

test('check valid chain is true', () => {
  let chain = setupChain(NUM_TEST_BLOCKS);
  expect(chain.getChain()).toHaveLength(NUM_TEST_BLOCKS);
  expect(chain.checkValidChain(chain)).toBeTruthy();
});

test('check invalid chain is false', () => {
  let chain = setupChain(NUM_TEST_BLOCKS);
  let nc = chain.getChain();
  let wrongBlock = new BlockObj(
    0,
    'block name',
    String(Date.now()),
    false,
    'block data',
    'wrong hash',
    'wrong last hash',
    -1,
    'sig'
  );
  nc.push(wrongBlock);
  chain.setChain(nc);
  expect(chain.getChain()).toHaveLength(NUM_TEST_BLOCKS + 1);
  expect(chain.checkValidChain(chain)).toBeFalsy();
});

test('adding a block to end of chain and checking validity', () => {
  let chain = setupChain(NUM_TEST_BLOCKS);
  expect(chain.getChain()).toHaveLength(NUM_TEST_BLOCKS);
  expect(chain.checkValidChain(chain)).toBeTruthy();

  // Add block and check validity
  chain.addBlock('new block data');
  expect(chain.getChain()).toHaveLength(NUM_TEST_BLOCKS + 1);
  expect(chain.checkValidChain(chain)).toBeTruthy();
});

test('replacing a chain if new chain is shorter', () => {
  let chain = setupChain(NUM_TEST_BLOCKS);
  expect(chain.getChain()).toHaveLength(NUM_TEST_BLOCKS);
  expect(chain.checkValidChain(chain)).toBeTruthy();

  let newChain = setupChain(NUM_TEST_BLOCKS - 1);
  expect(newChain.getChain()).toHaveLength(NUM_TEST_BLOCKS - 1);
  expect(newChain.checkValidChain(newChain)).toBeTruthy();

  // Replace chain with new chain, expect to not replace as new chain is shorter
  expect(chain.replaceChain(newChain)).toBeFalsy();
  expect(chain.getChain()).toHaveLength(NUM_TEST_BLOCKS);
  expect(chain.checkValidChain(chain)).toBeTruthy();
});

test('replacing a chain if new chain is longer and validity is false', () => {
  let chain = setupChain(NUM_TEST_BLOCKS);
  expect(chain.getChain()).toHaveLength(NUM_TEST_BLOCKS);
  expect(chain.checkValidChain(chain)).toBeTruthy();

  let newChain = setupChain(NUM_TEST_BLOCKS);
  let nc = newChain.getChain();
  let wrongBlock = new BlockObj(
    0,
    'block name',
    String(Date.now()),
    false,
    'block data',
    'wrong hash',
    'wrong last hash',
    -1,
    'sig'
  );
  nc.push(wrongBlock);
  newChain.setChain(nc);
  expect(newChain.getChain()).toHaveLength(NUM_TEST_BLOCKS + 1);
  expect(newChain.checkValidChain(newChain)).toBeFalsy();

  // Replace chain with new chain, expect to not replace as new chain is invalid
  expect(chain.replaceChain(newChain)).toBeFalsy();
  expect(chain.getChain()).toHaveLength(NUM_TEST_BLOCKS);
  expect(chain.checkValidChain(chain)).toBeTruthy();
});

test('replacing a chain if new chain is longer and validity is true', () => {
  let chain = setupChain(NUM_TEST_BLOCKS);
  expect(chain.getChain()).toHaveLength(NUM_TEST_BLOCKS);
  expect(chain.checkValidChain(chain)).toBeTruthy();

  let newChain = setupChain(NUM_TEST_BLOCKS + 1);
  expect(newChain.getChain()).toHaveLength(NUM_TEST_BLOCKS + 1);
  expect(newChain.checkValidChain(newChain)).toBeTruthy();

  // Replace chain with new chain, expect to replace as new chain is valid
  expect(chain.replaceChain(newChain)).toBeTruthy();
  expect(chain.getChain()).toHaveLength(NUM_TEST_BLOCKS + 1);
  expect(chain.checkValidChain(chain)).toBeTruthy();
});

test('forcibly replacing a chain with a valid shorter one and checking validity is true', () => {
  let chain = setupChain(NUM_TEST_BLOCKS);
  expect(chain.getChain()).toHaveLength(NUM_TEST_BLOCKS);
  expect(chain.checkValidChain(chain)).toBeTruthy();

  let newChain = setupChain(NUM_TEST_BLOCKS - 1);
  expect(newChain.getChain()).toHaveLength(NUM_TEST_BLOCKS - 1);
  expect(newChain.checkValidChain(newChain)).toBeTruthy();

  // Force replace chain with new chain, expect to replace as new chain is valid
  chain.forceReplaceChain(newChain);
  expect(chain.getChain()).toHaveLength(NUM_TEST_BLOCKS - 1);
  expect(chain.checkValidChain(chain)).toBeTruthy();
});

test('correct hash for all blocks', () => {
  let chain = setupChain(NUM_TEST_BLOCKS);
  expect(chain.getChain()).toHaveLength(NUM_TEST_BLOCKS);

  // Check genesis is first block using hash
  let genesis = chain.getBlock(0);
  expect(genesis != null);
  if (genesis != null) {
    expect(genesis.getHash() === BlockObj.genesisBlock().getHash());
  }

  // Check rest of blocks hash
  let blocks = chain.getChain();
  for (let i = 1; i < NUM_TEST_BLOCKS; i++) {
    expect(blocks[i].getLastHash() === blocks[i - 1].getHash()).toBeTruthy();
    expect(
      blocks[i].getHash() ===
        BlockObj.hash(
          blocks[i].getTimestamp(),
          blocks[i - 1].getHash(),
          blocks[i].getBlockData()
        )
    ).toBeTruthy();
  }
});

test('changing block data and recalculating hash', () => {
  let chain = setupChain(NUM_TEST_BLOCKS);
  expect(chain.getChain()).toHaveLength(NUM_TEST_BLOCKS);

  // "Validate" all blocks
  for (let i = 0; i < NUM_TEST_BLOCKS; i++) {
    chain.getChain()[i].setValid(true);
    expect(chain.getChain()[i].getValid()).toBeTruthy();
  }
  // Change a block data
  let changeIdx = Math.floor(NUM_TEST_BLOCKS / 2);

  // Check that changed block is no longer valid
  let oldHash = chain.getChain()[changeIdx].getHash();
  chain.getChain()[changeIdx].setBlockData('temp new data');
  expect(oldHash !== chain.getChain()[changeIdx].getHash()).toBeTruthy();
  expect(chain.getChain()[changeIdx].getValid() === false).toBeTruthy();
  expect(chain.checkValidChain(chain)).toBeFalsy();
});
