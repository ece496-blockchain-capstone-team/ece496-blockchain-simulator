import Host, { NodeId } from './Host';
import Location from './Location';

export default interface NetworkObj {
  validator: NodeId | null;
  nodes: Host[];
  locations: Location[];
  timeCounter: number;
}
