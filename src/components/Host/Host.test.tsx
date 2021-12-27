import React from 'react';
import { render, screen } from '@testing-library/react';
import Host from './Host';
import HostObj from '../../services/Host';

let hosts: HostObj[] = [];
for (let i = 0; i < 1000; i++) {
  hosts.push(new HostObj(i, 'test' + i, 1, 'general', 1));
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
  let removed01 = hosts[0].removeConnectedNode(hosts[1]);
  let removed10 = hosts[1].removeConnectedNode(hosts[0]);

  expect(removed01).toBeTruthy();
  expect(removed10).toBeTruthy();
  expect(hosts[0].getConnectedNodes()[0].getId()).toBe(2);
  expect(hosts[0].getConnectedNodes().length).toBe(1);
  expect(hosts[1].getConnectedNodes()[0].getId()).toBe(3);
  expect(hosts[1].getConnectedNodes().length).toBe(1);
});
