import ChainObj from './Chain';
import Actions from './Actions';
import BlockObj from './Block';
import HostRole from './HostRole';

/**
 * # HostObj
 * <br/>
 * Contains information about a host and functions for changing or retrieving that information
 */
export default class HostObj {
  /**
   * The unique ID number for the host
   */
  nodeId: number;
  /**
   * A name for the host
   */
  nodeName: string;
  /**
   * The amount of currency that the host has deposited
   */
  stake: number;
  /**
   * The ID of the geographical location that the host is in
   */
  locationId: number;
  /**
   * A list of **HostObj** that are connected to this host
   */
  connectedNodes: HostObj[] = [];
  /**
   * The most recent time value when this node was the leader
   */
  lastLeaderTime: number = 0;
  /**
   * The most recent time value when this node performed an action
   */
  lastActionTime: number = 0;
  /**
   * The amount of currency that was earned by this host
   */
  earnings: number = 0;
  /**
   * The copy of the blockchain held by the host
   */
  chain: ChainObj;
  /**
   * A history of **Actions** performed by this host
   */
  actions: Actions;
  /**
   * The **HostRole** that this host is currently performing
   */
  role: HostRole;

  /**
   * Creates a new host object
   * @param id The unique ID number for the host
   * @param name A name for the host
   * @param location The ID of the geographical location that the host is in
   * @param role The role that this host is currently performing
   * @param stake The amount of currency that the host has deposited
   * @param connections A list of **HostObj** that are connected to this host
   */
  constructor(
    id: number,
    name: string,
    location: number,
    role: string,
    stake: number,
    connections?: HostObj[]
  ) {
    this.nodeId = id;
    this.nodeName = name;
    this.stake = stake;
    this.locationId = location;
    this.role = new HostRole(role);
    if (connections) {
      this.connectedNodes = connections;
    }
    this.chain = new ChainObj();
    this.actions = new Actions();
  }

  /**
   * Connects one or more hosts to this host
   * @param nodes A list of **HostObj** to connect to this host
   */
  addConnectedNodes(nodes: HostObj[]) {
    for (let i = 0; i < nodes.length; i++) {
      if (!this.connectedNodes.includes(nodes[i])) {
        this.connectedNodes.push(nodes[i]);
      }
    }
  }

  /**
   * Disconnects this host from one other host.
   * This function needs to be called for both hosts involved.
   * @param node A **HostObj** currently connected to this host
   * @returns Whether the disconnection was successful for this host
   */
  removeConnectedNode(node: HostObj) {
    const index = this.connectedNodes.indexOf(node);
    if (index > -1) {
      this.connectedNodes.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Changes the amount of stake that this host has deposited
   * @param stake The new deposit amount
   */
  setStake(stake: number) {
    this.stake = stake;
  }

  /**
   * Add one or more actions to the history of this host
   * @param time The time value of the action that was added
   * @param action A list of actions performed during this time
   */
  addAction(time: number, action: any[]) {
    this.actions.addActions(time, action);
    this.lastActionTime = time;
  }

  /**
   * This host votes on a block. Currently, the host always votes yes.
   * @param time The time value when the validation was performed
   * @param block The **BlockObj** for validation
   * @returns The decision of the host
   */
  validateBlock(time: number, block: BlockObj) {
    this.addAction(time, ['Validated a block']);
    return true;
  }

  /**
   * Updates the host's blockchain with a new block
   * @param time The time value when the block was added
   * @param block The **BlockObj** to be added
   */
  addBlock(time: number, block: BlockObj) {
    this.addAction(time, ['Updated the blockchain']);
    this.chain.addBlock();
  }

  /**
   * When this host is the leader, it can propose a new block
   * @param time The time value when the leader proposed a new block
   * @returns The proposed **BlockObj**, or null if the host is not a leader
   */
  proposeBlock(time: number) {
    if (this.role.type === 'leader') {
      this.lastLeaderTime = time;
      this.addAction(time, ['Proposed a new block']);
      return new BlockObj();
    }
    return null;
  }

  /**
   * Add currency to the host's account
   * @param time The time value when the host earned currency
   * @param amount The amount of currency the host gained
   */
  addEarnings(time: number, amount: number) {
    this.addAction(time, ['Received ' + amount]);
    this.earnings += amount;
  }

  /**
   * Change the role of the host
   * @param role A the host's new **HostRole**
   */
  changeRole(role: string) {
    this.role = new HostRole(role);
  }

  /**
   * Query the actions list of the host
   * @param time The time value to query
   * @returns The list of actions performed at that time
   */
  getAction(time: number) {
    return this.actions.getActions(time);
  }

  /**
   * @returns The unique ID number for the host
   */
  getId() {
    return this.nodeId;
  }

  /**
   * @returns The name of the host
   */
  getName() {
    return this.nodeName;
  }

  /**
   * @returns The **HostRole** that this host is currently performing
   */
  getRole() {
    return this.role;
  }

  /**
   * @returns The amount of currency that was earned by this host
   */
  getStake() {
    return this.stake;
  }

  /**
   * @returns A list of **HostObj** that are connected to this host
   */
  getConnectedNodes() {
    return this.connectedNodes;
  }

  /**
   * @returns The copy of the blockchain held by the host
   */
  getChain() {
    return this.chain;
  }

  /**
   * @returns The most recent time value when this node was the leader
   */
  getLastLeaderTime() {
    return this.lastLeaderTime;
  }

  /**
   * @returns The most recent time value when this node performed an action
   */
  getLastActionTime() {
    return this.lastActionTime;
  }

  /**
   * @returns The amount of currency this node has earned from being a leader
   */
  getEarnings() {
    return this.earnings;
  }
}
