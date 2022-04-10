import Host, { NodeId } from './Host';
import Actions from './Actions';
import Location, { LocationId } from './Location';
import { Connection, ConnectionId } from './Connections';

export type NodeTable = { [id: NodeId]: Host };
export type LocationTable = { [id: LocationId]: Location };
export type ConnectionTable = { [id: ConnectionId]: Connection };
// export type LatencyTable = { [id: LocationId]: number};

export default interface Network {
  validator: NodeId | null;
  nodes: NodeTable;
  locations: LocationTable;
  connections: ConnectionTable;
  timeCounter: number;
  viewNumber: number;
  leader: NodeId;
  actionQueue: Actions;
  logs: any;
  latency: number;
  throughput: number;
  latencyMatrix: any;
}
