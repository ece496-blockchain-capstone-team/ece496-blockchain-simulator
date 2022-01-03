import React from 'react';
import { render, screen } from '@testing-library/react';
import BlockView from './Block';
import BlockObj from '../../services/Block';

const NUM_TEST_BLOCKS = 10;

function setupBlocksList(numberOfBlocks: number): BlockObj[] {
  let blocks: BlockObj[] = [];
  blocks.push(BlockObj.genesisBlock());
  for (let i = 1; i < numberOfBlocks; i++) {
    blocks.push(BlockObj.createBlock(i, blocks[i - 1], 'block data for block: ' + i));
  }
  return blocks;
}

test('renders test paragraph for block view', () => {
  render(<BlockView />);
  const element = screen.getByText(/block view/i);
  expect(element).toBeInTheDocument();
});

test('correct hash for all blocks', () => {
  let blocks = setupBlocksList(NUM_TEST_BLOCKS);
  expect(blocks).toHaveLength(NUM_TEST_BLOCKS);

  // Check genesis hash
  expect(
    blocks[0].getHash() ===
      BlockObj.hash(
        blocks[0].getTimestamp(),
        blocks[0].getLastHash(),
        blocks[0].getBlockData()
      )
  );

  // Check rest of blocks hash
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
  let blocks = setupBlocksList(NUM_TEST_BLOCKS);
  expect(blocks).toHaveLength(NUM_TEST_BLOCKS);

  // "Validate" all blocks
  for (let i = 0; i < NUM_TEST_BLOCKS; i++) {
    blocks[i].setValid(true);
  }
  // Change a block data
  let changeIdx = Math.floor(NUM_TEST_BLOCKS / 2);

  let oldHash = blocks[changeIdx].getHash();
  blocks[changeIdx].setBlockData('temp new data');
  expect(oldHash !== blocks[changeIdx].getHash()).toBeTruthy();
  expect(blocks[changeIdx].getValid() === false).toBeTruthy();
});
