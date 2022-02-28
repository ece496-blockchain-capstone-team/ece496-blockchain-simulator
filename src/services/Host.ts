import ChainObj from './Chain';
import Actions from './Actions';
import BlockObj from './Block';

enum Role { // eslint-disable-line no-shadow
  General = 'General',
  Leader = 'Leader',
  Malicious = 'Malicious',
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
  private role: Role;

  /**
   * An enum containing all possible roles for the host: General, Leader, Malicious
   */
  static Role = Role;

  /**
   * Creates a new host object
   * @param id The unique ID number for the host
   * @param name A name for the host
   * @param location The ID of the geographical location that the host is in
   * @param stake The amount of currency that the host has deposited
   * @param role The role that this host is currently performing
   */
  constructor(id: number, name: string, location: number, stake: number, role?: Role) {
    this.nodeId = id;
    this.nodeName = name;
    this.stake = stake;
    this.locationId = location;
    if (role) {
      this.role = role;
    } else {
      this.role = Role.General;
    }
    this.chain = new ChainObj();
    this.actions = new Actions();
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
    this.actions.addActions(time, action);
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
}
