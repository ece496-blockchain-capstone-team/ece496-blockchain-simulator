import Host from './Host';
import ConnectionObj from './Connections';
import HostRole from './HostType';

export default interface NetworkObj {
  nodeList: Host[];
  timeCounter: number;
}
