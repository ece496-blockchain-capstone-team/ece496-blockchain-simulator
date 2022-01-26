import Host, { NodeId } from './Host';
import ConnectionObj from './Connections';

export default interface NetworkObj {
  validator: NodeId | null;
  nodes: Host[];
  timeCounter: number;
}
