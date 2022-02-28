import { NodeId } from './Host';

export type ConnectionId = number;

export interface Connection {
  id: ConnectionId;
  nodeIds: NodeId[];
  propagationTime: number;
}

export default class ConnectionObj implements Connection {
  id: number;
  nodeIds: number[] = [];
  propagationTime: number;

  constructor(host1: number, host2: number, propagation?: number) {
    this.nodeIds.push(host1);
    this.nodeIds.push(host2);
    if (propagation) {
      this.propagationTime = propagation;
    } else {
      this.propagationTime = 1;
    }
  }
}
