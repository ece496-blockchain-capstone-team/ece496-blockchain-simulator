import ChainObj from './Chain';
import Actions from './actions';
import BlockObj from './Block';

export default class Host {
  nodeId: number;
  nodeName: string;
  userStake: number;
  locationId: number;
  connectedNodes: Host[] = [];
  lastLeaderTime: number = 0;
  lastActionTime: number = 0;
  chain: ChainObj;
  actions: Actions;

  constructor(id: number, name: string, stake: number, connections: Host[]) {
    this.nodeId = id;
    this.nodeName = name;
    this.userStake = stake;
    this.connectedNodes = connections;
    this.chain = new ChainObj();
    this.actions = new Actions();
  }

  addConnectedNode(node: Host) {
    this.connectedNodes.push(node);
  }

  removeConnectedNode(node: Host) {
    const index = this.connectedNodes.indexOf(node);
    if (index > -1) {
      this.connectedNodes.splice(index, 1);
      return true;
    }
    return false;
  }

  setStake(stake: number) {
    this.userStake = stake;
  }

  addAction(time: number, action: any[]) {
    this.actions.addAction(time, action);
    this.lastActionTime = time;
  }

  validateBlock(block: BlockObj) {
    return true;
  }

  addBlock(block: BlockObj) {
    this.chain.addBlock();
  }

  proposeBlock(time: number) {
    this.lastLeaderTime = time;
    return new BlockObj();
  }

  getAction(time: number) {
    return this.actions.getNextAction(time);
  }

  getId() {
    return this.nodeId;
  }

  getName() {
    return this.nodeName;
  }

  getStake() {
    return this.userStake;
  }

  getConnectedNodes() {
    return this.connectedNodes;
  }

  getChain() {
    return this.chain;
  }

  getLastLeaderTime() {
    return this.lastLeaderTime;
  }

  getLastActionTime() {
    return this.lastActionTime;
  }
}
