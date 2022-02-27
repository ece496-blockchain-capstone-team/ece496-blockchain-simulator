import Host, { NodeId } from './Host';
import Location, { LocationId } from './Location';

export type NodeTable = { [id: NodeId]: Host };
export type LocationTable = { [id: LocationId]: Location };

export default interface NetworkObj {
  validator: NodeId | null;
  nodes: NodeTable;
  locations: LocationTable;
  timeCounter: number;
}
