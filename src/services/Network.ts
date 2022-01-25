import Host from './Host';
import ConnectionObj from './Connections';

export default interface NetworkObj {
  nodeList: Host[];
  timeCounter: number;
}
