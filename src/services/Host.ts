import ChainObj from './Chain';
import Actions from './Actions';
import BlockObj from './Block';

enum Role { // eslint-disable-line no-shadow
  General = 'General',
  Leader = 'Leader',
  Malicious = 'Malicious',
}
export enum Stage { // eslint-disable-line no-shadow
  None = 'none',
  Prepare = 'prepare',
  PreCommit = 'pre-commit',
  Commit = 'commit',
  Decide = 'decide',
}

export type NodeId = number;

/**
 * # Host
 * <br/>
 * Contains information about a host and functions for changing or retrieving that information
 */
export default class Host {
  /**
   * The unique ID number for the host
   */
  private nodeId: NodeId;
  /**
   * A name for the host
   */
  private nodeName: string;
  /**
   * The amount of currency that the host has deposited
   */
  private stake: number;
  /**
   * The ID of the geographical location that the host is in
   */
  private locationId: number;
  /**
   * List of IDs of connections to host
   */
  public connectionIds: number[];

  private connectedNodes: NodeId[] = [];

  /**
   * The most recent time value when this node was the leader
   */
  private lastLeaderTime: number = 0;
  /**
   * The most recent time value when this node performed an action
   */
  private lastActionTime: number = 0;
  /**
   * The amount of currency that was earned by this host
   */
  private earnings: number = 0;
  /**
   * The copy of the blockchain held by the host
   */
  private chain: ChainObj;
  /**
   * A history of **Actions** performed by this host
   */
  private actions: Actions;
  /**
   * The **Role** that this host is currently performing
   */
  public role: Role;

  /**
   * An enum containing all possible roles for the host: General, Leader, Malicious
   */
  static Role = Role;

  public viewNum: number;
  public totalNodes: number;

  /**
   * Creates a new host object
   * @param id The unique ID number for the host
   * @param name A name for the host
   * @param location The ID of the geographical location that the host is in
   * @param stake The amount of currency that the host has deposited
   * @param role The role that this host is currently performing
   */
  constructor(
    id: number,
    name: string,
    location: number,
    stake: number,
    viewNum: number,
    totalNodes: number,
    role?: Role,
    connections?: NodeId[]
  ) {
    this.nodeId = id;
    this.nodeName = name;
    this.stake = stake;
    this.locationId = location;
    this.totalNodes = totalNodes;
    if (role) {
      this.role = role;
    } else {
      this.role = Role.General;
    }
    if (connections) {
      this.connectedNodes = connections;
    }
    this.viewNum = viewNum;
    this.chain = new ChainObj();
    this.actions = new Actions();
  }

  /**
   * Connects one or more hosts to this host
   * @param nodes A list of **NodeId**s to connect to this host
   */
  addConnectedNodes(nodes: NodeId[]): void {
    nodes.forEach((nodeId) =>
      this.connectedNodes.includes(nodeId) ? null : this.connectedNodes.push(nodeId)
    );
  }

  /**
   * Helper function for removing a node from this host's list of connected nodes
   * @param node A **NodeId** currently connected to this host
   * @returns Whether the disconnection was successful for this host
   */
  private removeConnectedNode(node: NodeId): boolean {
    const index = this.connectedNodes.indexOf(node);
    if (index > -1) {
      this.connectedNodes.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Disconnects this host from one other host, and disconnects that host form this host
   * @param node A **Host** currently connected to this host
   * @returns Whether the disconnection was successful
   */
  disconnectFrom(node: Host): boolean {
    if (
      this.removeConnectedNode(node.getId()) &&
      node.removeConnectedNode(this.getId())
    ) {
      return true;
    }
    return false;
  }

  /**
   * Changes the amount of stake that this host has deposited
   * @param stake The new deposit amount
   */
  setStake(stake: number): void {
    this.stake = stake;
  }

  /**
   * Add one or more actions to the history of this host
   * @param time The time value of the action that was added
   * @param action A list of actions performed during this time
   */
  addAction(time: number, action: any[]): void {
    // this.actions.addActions(time, action);
    this.lastActionTime = time;
  }

  /**
   * This host votes on a block. The host must be a validator in order to
   * validate the block. The host checks that the block's last hash is the
   * same as the last block in the host's chain. Then, the host checks that
   * the new block's hash is correctly calculated.
   * @param time The time value when the validation was performed
   * @param block The **BlockObj** for validation
   * (under assumption that it will be added to end of host chain)
   * @returns The decision of the host
   */
  validateBlock(time: number, block: BlockObj): boolean {
    let validated =
      this.getRole() === Host.Role.Leader &&
      block.getLastHash() === this.getChain().getLastBlock().getHash() &&
      block.getHash() === BlockObj.calculateHash(block);
    // Valid block
    if (validated) {
      block.setValid(validated);
      block.setValidatorId(this.nodeId);
      this.addAction(time, ['Validated a block']);
      return true;
    }
    // Invalid block
    this.addAction(time, ['Failed to validate block']);
    return false;
  }

  /**
   * Updates the host's blockchain with a new block regardless of validity of
   * the block
   * @param time The time value when the block was added
   * @param block The **BlockObj** to be added
   */
  forceAddBlock(time: number, block: BlockObj): void {
    this.addAction(time, ['Updated the blockchain']);
    this.chain.forceAddBlock(block);
  }

  /**
   * When this host is the leader, it can propose a new block
   * @param time The time value when the leader proposed a new block
   * @param lastBlock The last block in the blockchain
   * @returns The proposed **BlockObj**, or null if the host is not a leader
   */
  proposeBlock(time: number, lastBlock: BlockObj): BlockObj | null {
    if (this.role === Role.Leader) {
      this.lastLeaderTime = time;
      this.addAction(time, ['Proposed a new block']);
      return BlockObj.createBlock(
        lastBlock.getBlockId() + 1,
        lastBlock,
        'dummy-block-data'
      );
    }
    return null;
  }

  /**
   * Add currency to the host's account
   * @param time The time value when the host earned currency
   * @param amount The amount of currency the host gained
   */
  addEarnings(time: number, amount: number): void {
    this.addAction(time, ['Received ' + amount]);
    this.earnings += amount;
  }

  /**
   * Change the role of the host
   * @param role A the host's new **Role**
   */
  changeRole(role: Role): void {
    this.role = role;
  }

  /**
   * Query the actions list of the host
   * @param time The time value to query
   * @returns The list of actions performed at that time
   */
  getAction(time: number): any {
    return this.actions.getActions(time);
  }

  /**
   * @returns The unique ID number for the host
   */
  getId(): number {
    return this.nodeId;
  }

  /**
   * @returns The name of the host
   */
  getName(): string {
    return this.nodeName;
  }

  /**
   * @returns The ID of the geographical location that the host is in
   */
  getLocationId(): number {
    return this.locationId;
  }

  /**
   * @returns The **Role** that this host is currently performing
   */
  getRole(): Role {
    return this.role;
  }

  /**
   * @returns The amount of currency that was earned by this host
   */
  getStake(): number {
    return this.stake;
  }

  /**
   * @returns The copy of the blockchain held by the host
   */
  getChain(): ChainObj {
    return this.chain;
  }

  /**
   * @returns The most recent time value when this node was the leader
   */
  getLastLeaderTime(): number {
    return this.lastLeaderTime;
  }

  /**
   * @returns The most recent time value when this node performed an action
   */
  getLastActionTime(): number {
    return this.lastActionTime;
  }

  /**
   * @returns The amount of currency this node has earned from being a leader
   */
  getEarnings(): number {
    return this.earnings;
  }

  setRoleLeader(): void {
    this.role = Role.Leader;
  }
  setRoleGeneral(): void {
    this.role = Role.General;
  }
  setRoleMalicious(): void {
    this.role = Role.Malicious;
  }

  public stage: string = 'none';
  private newVeiwCount: number = 0;
  private prepareVoteCount: number = 0;
  private preCommitVoteCount: number = 0;
  private commitVoteCount: number = 0;

  processAction(act: any): any {
    let retAction: any = {};
    // console.log(act);
    // if(act.split(" ")[1] === "new-view"){
    if (act.act === 'new-view') {
      return this.newViewRecv();
    }
    if (act.act === 'prepare') {
      return this.prepareRecv(act.sender, act.blockObj);
    }
    if (act.act === 'prepare-vote') {
      return this.prepareVoteRecv();
    }
    if (act.act === 'pre-commit') {
      return this.preCommitRecv(act.sender);
    }
    if (act.act === 'pre-commit-vote') {
      return this.preCommitVoteRecv();
    }
    if (act.act === 'commit') {
      return this.commitRecv(act.sender);
    }
    if (act.act === 'commit-vote') {
      return this.commitVoteRecv();
    }
    if (act.act === 'decide') {
      return this.decideRecv(act.viewNum, act.blockObj);
    }
    return retAction;
  }
  newViewRecv(): any {
    let retAction: any = {};
    if (this.newVeiwCount < this.totalNodes - 2 || this.role === Role.Leader) {
      this.newVeiwCount += 1;
      return retAction;
    }
    if (this.stage !== Stage.None) {
      return retAction;
    }
    this.setRoleLeader();
    this.newVeiwCount = 0;
    this.viewNum += 1;
    this.stage = Stage.Prepare;
    return this.prepareSend();
  }
  prepareSend(): any {
    // propose blocks and stuff
    let retAction: any = {};
    retAction.action = 'brodcast';
    retAction.blockObj = this.chain.addBlock('test');
    retAction.processingDelay = 2;
    retAction.message = 'prepare';
    return retAction;
  }
  prepareRecv(sender: NodeId, block: BlockObj): any {
    // validates transaction
    // if (this.validateBlock(0, block)){
    //   return this.prepareVoteSend(sender);
    // }
    return this.prepareVoteSend(sender);
    // let retAction: any = {};
    // return retAction;
  }
  prepareVoteSend(target: NodeId): any {
    let retAction: any = {};
    retAction.action = 'transmit';
    retAction.targetNode = target;
    retAction.processingDelay = 2;
    retAction.message = 'prepare-vote';
    return retAction;
  }
  prepareVoteRecv(): any {
    // use actual quorum certificate or atleast keep track of all the nodes that returned
    let retAction: any = {};
    if (this.role !== Role.Leader) {
      return retAction;
    }
    if (this.prepareVoteCount < this.totalNodes - 2) {
      this.prepareVoteCount += 1;
      return retAction;
    }
    if (this.stage !== Stage.Prepare) {
      return retAction;
    }
    this.stage = Stage.PreCommit;
    this.prepareVoteCount = 0;
    return this.preCommitSend();
  }
  preCommitSend(): any {
    let retAction: any = {};
    retAction.action = 'brodcast';
    retAction.blockObj = this.chain.getLastBlock();
    retAction.processingDelay = 2;
    retAction.message = 'pre-commit';
    this.stage = Stage.Commit;
    return retAction;
  }
  preCommitRecv(sender: NodeId): any {
    // validates transaction
    return this.preCommitVoteSend(sender);
  }
  preCommitVoteSend(target: NodeId): any {
    let retAction: any = {};
    retAction.action = 'transmit';
    retAction.targetNode = target;
    retAction.processingDelay = 2;
    retAction.message = 'pre-commit-vote';
    return retAction;
  }
  preCommitVoteRecv(): any {
    let retAction: any = {};
    if (this.role !== Role.Leader) {
      return retAction;
    }
    if (this.preCommitVoteCount < this.totalNodes - 2) {
      this.preCommitVoteCount += 1;
      return retAction;
    }
    this.preCommitVoteCount = 0;
    return this.commitSend();
  }
  commitSend(): any {
    let retAction: any = {};
    retAction.action = 'brodcast';
    retAction.blockObj = this.chain.getLastBlock();
    retAction.processingDelay = 2;
    retAction.message = 'commit';
    this.stage = Stage.Decide;
    return retAction;
  }
  commitRecv(sender: NodeId): any {
    // validates transaction
    return this.commitVoteSend(sender);
  }
  commitVoteSend(target: NodeId): any {
    let retAction: any = {};
    retAction.action = 'transmit';
    retAction.targetNode = target;
    retAction.processingDelay = 2;
    retAction.message = 'commit-vote';
    return retAction;
  }
  commitVoteRecv(): any {
    let retAction: any = {};
    if (this.role !== Role.Leader) {
      return retAction;
    }
    if (this.commitVoteCount < this.totalNodes - 2) {
      this.commitVoteCount += 1;
      return retAction;
    }
    this.commitVoteCount = 0;
    return this.decideSend();
  }
  decideSend(): any {
    let retAction: any = {};
    retAction.action = 'brodcast';
    retAction.blockObj = this.chain.getLastBlock();
    retAction.processingDelay = 2;
    retAction.message = 'decide';
    retAction.viewNum = this.viewNum;
    this.stage = Stage.None;
    this.setRoleGeneral();
    return retAction;
  }
  decideRecv(requestView: number, block: BlockObj): any {
    // validates transaction
    // local state transition
    this.chain.forceAddBlock(block);
    if (this.viewNum < requestView) {
      this.viewNum = requestView;
    }
    return this.newViewSend();
  }
  newViewSend(): any {
    let retAction: any = {};
    retAction.action = 'new-view';
    retAction.processingDelay = 2;
    retAction.message = 'new-view';
    this.stage = Stage.None;
    return retAction;
  }
}
