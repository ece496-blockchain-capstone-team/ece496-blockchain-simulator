import Host, { NodeId } from './Host';
import Location, { LocationId } from './Location';

export default interface NetworkObj {
  validator: NodeId | null;
  nodes: { [id: NodeId]: Host };
  locations: { [id: LocationId]: Location };
  timeCounter: number;
}
