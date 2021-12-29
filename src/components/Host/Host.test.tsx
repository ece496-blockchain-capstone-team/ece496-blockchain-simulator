import React from 'react';
import { render, screen } from '@testing-library/react';
import Host from './Host';
import HostObj from '../../services/Host';

let hosts: HostObj[] = [];
const MIN_HOST_SUPPORT = 1000;
for (let i = 0; i < MIN_HOST_SUPPORT; i++) {
  hosts.push(new HostObj(i, 'test' + i, 1, 1, 'general'));
}

test('renders test paragraph for host view', () => {
  render(<Host />);
  const element = screen.getByText(/host view/i);
  expect(element).toBeInTheDocument();
});

test('hosts can connect to other hosts', () => {
  // set up a small network
  hosts[0].addConnectedNodes([hosts[1], hosts[2]]);
  hosts[1].addConnectedNodes([hosts[0], hosts[3]]);
  hosts[2].addConnectedNodes([hosts[0], hosts[3]]);
  hosts[3].addConnectedNodes([hosts[1], hosts[2]]);

  // try to add duplicate nodes
  hosts[0].addConnectedNodes([hosts[2], hosts[1]]);

  expect(hosts[0].getConnectedNodes()[0].getId()).toBe(1);
  expect(hosts[0].getConnectedNodes()[1].getId()).toBe(2);
  expect(hosts[0].getConnectedNodes().length).toBe(2);
});

test('hosts can disconnect from other hosts', () => {
  let removed = hosts[0].disconnectFrom(hosts[1]);

  expect(removed).toBeTruthy();
  expect(hosts[0].getConnectedNodes()[0].getId()).toBe(2);
  expect(hosts[0].getConnectedNodes().length).toBe(1);
  expect(hosts[1].getConnectedNodes()[0].getId()).toBe(3);
  expect(hosts[1].getConnectedNodes().length).toBe(1);
});
