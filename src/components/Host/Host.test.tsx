import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../../store';
import BlockObj from '../../services/Block';
import ChainObj from '../../services/Chain';
import HostView from './Host';
import Host from '../../services/Host';

const NUM_TEST_BLOCKS = 10;
const MIN_HOST_SUPPORT = 1000;

/**
 * Creates a chain of size numberOfBlocks blocks (including genesis block)
 * @param numberOfBlocks number of blocks in chain
 * @returns ChainObj initial chain setup with numberOfBlocks blocks
 */
function setupChain(numberOfBlocks: number): ChainObj {
  let chain = new ChainObj();
  for (let i = 1; i < numberOfBlocks; i++) {
    chain.addBlock('block data for block: ' + i);
  }
  return chain;
}

/**
 * Creates a host list of size numberOfHosts hosts
 * @param numberOfHosts number of hosts in list
 * @returns list of Host objects
 */
function setupHostsList(numberOfHosts: number): Host[] {
  let hosts: Host[] = [];
  for (let i = 0; i < MIN_HOST_SUPPORT; i++) {
    hosts.push(new Host(i, 'test' + i, 1, 1, Host.Role.General));
  }
  return hosts;
}

test('renders test paragraph for host view', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <HostView />
      </Provider>
    </BrowserRouter>
  );
  const element = screen.getByText(/host view/i);
  expect(element).toBeInTheDocument();
});

test('non-leader host attempts to validate blocks', () => {
  let chain = setupChain(NUM_TEST_BLOCKS);
  let validBlock = BlockObj.createBlock(
    NUM_TEST_BLOCKS + 1,
    chain.getLastBlock(),
    'dummy data'
  );
  let invalidBlock = BlockObj.createBlock(
    NUM_TEST_BLOCKS + 1,
    chain.getChain()[0],
    'dummy data'
  );
  let generalHost = new Host(0, 'generalHost', 1, 1, Host.Role.General);
  let maliciousHost = new Host(0, 'maliciousHost', 1, 1, Host.Role.Malicious);
  let undefinedHost = new Host(0, 'undefinedHost', 1, 1);
  for (let b = 1; b < chain.getChain().length; b++) {
    generalHost.forceAddBlock(Date.now(), chain.getChain()[b]);
    maliciousHost.forceAddBlock(Date.now(), chain.getChain()[b]);
    undefinedHost.forceAddBlock(Date.now(), chain.getChain()[b]);
  }
  expect(generalHost.getChain().getChain()).toHaveLength(NUM_TEST_BLOCKS);
  expect(generalHost.validateBlock(Date.now(), validBlock)).toBeFalsy();
  expect(generalHost.validateBlock(Date.now(), invalidBlock)).toBeFalsy();
  expect(maliciousHost.getChain().getChain()).toHaveLength(NUM_TEST_BLOCKS);
  expect(maliciousHost.validateBlock(Date.now(), validBlock)).toBeFalsy();
  expect(maliciousHost.validateBlock(Date.now(), invalidBlock)).toBeFalsy();
  expect(undefinedHost.getChain().getChain()).toHaveLength(NUM_TEST_BLOCKS);
  expect(undefinedHost.validateBlock(Date.now(), validBlock)).toBeFalsy();
  expect(undefinedHost.validateBlock(Date.now(), invalidBlock)).toBeFalsy();
});

test('leader host validates a correct block and fails to validate an incorrect block', () => {
  let chain = setupChain(NUM_TEST_BLOCKS);
  let validBlock = BlockObj.createBlock(
    NUM_TEST_BLOCKS + 1,
    chain.getLastBlock(),
    'dummy data'
  );
  let invalidBlock = BlockObj.createBlock(
    NUM_TEST_BLOCKS + 1,
    chain.getChain()[0],
    'dummy data'
  );
  let leaderHost = new Host(0, 'leaderHost', 1, 1, Host.Role.Leader);
  for (let b = 1; b < chain.getChain().length; b++) {
    leaderHost.forceAddBlock(Date.now(), chain.getChain()[b]);
  }
  expect(leaderHost.getChain().getChain()).toHaveLength(NUM_TEST_BLOCKS);
  expect(leaderHost.validateBlock(Date.now(), validBlock)).toBeTruthy();
  expect(leaderHost.validateBlock(Date.now(), invalidBlock)).toBeFalsy();
});
