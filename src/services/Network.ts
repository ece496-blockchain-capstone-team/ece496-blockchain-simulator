import Host from './Host';
import ConnectionObj from './Connections';

export default interface NetworkObj {
  validator: Host | null;
  nodeList: Host[];
  timeCounter: number;
}
