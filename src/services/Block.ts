import CryptoJS from 'crypto-js';

export default class BlockObj {
  private blockId: number;
  private blockName: string; // TODO: Unused, can be set by host and added to hash
  private timestamp: string; // creation time
  private valid: boolean; // TODO: In host class, add validate() function to set validatorId and valid = true
  private blockData: string;
  private hash: string;
  private lastHash: string;
  private validatorId: number; // TODO: In host class, add validate() function to set validatorId and valid = true
  private signature: string; // TODO: unused, needed?

  /**
   * Block object
   * @param blockId id # of block
   * @param blockName block name
   * @param timestamp time stamp of creation
   * @param valid boolean on whether or not the block has been validated
   * @param blockData string of block data
   * @param hash hash of block
   * @param lastHash hash of last block
   * @param validatorId id of validator that validated this block, -1 if not validated
   * @param signature TODO: needed?
   */
  constructor(
    blockId: number,
    blockName: string,
    timestamp: string,
    valid: boolean,
    blockData: string,
    hash: string,
    lastHash: string,
    validatorId: number,
    signature: string
  ) {
    this.blockId = blockId;
    this.blockName = blockName;
    this.timestamp = timestamp;
    this.valid = valid;
    this.blockData = blockData;
    this.hash = hash;
    this.lastHash = lastHash;
    this.validatorId = validatorId;
    this.signature = signature;
  }

  /**
   * Get blockId
   */
  getBlockId(): number {
    return this.blockId;
  }

  /**
   * Get blockName
   */
  getBlockName(): string {
    return this.blockName;
  }

  /**
   * Get timestamp
   */
  getTimestamp(): string {
    return this.timestamp;
  }

  /**
   * Get valid status of block
   */
  getValid(): boolean {
    return this.valid;
  }

  /**
   * Get blockData
   */
  getBlockData(): string {
    return this.blockData;
  }

  /**
   * Get hash
   */
  getHash(): string {
    return this.hash;
  }

  /**
   * Get last block's hash
   */
  getLastHash(): string {
    return this.lastHash;
  }

  /**
   * Get validatorId
   */
  getValidatorId(): number {
    return this.validatorId;
  }

  /**
   * Get signature
   */
  getSignature(): string {
    return this.signature;
  }

  /**
   * Return string form of block
   * @returns
   */
  getString(): string {
    let str: string = `
        Block Info:\n
        blockId: ${this.blockId}\n
        blockName: ${this.blockName}\n
        timestamp: ${this.timestamp}\n
        valid: ${this.valid}\n
        blockData: ${this.blockData}\n
        hash: ${this.hash}\n
        lastHash: ${this.lastHash}\n
        validatorId: ${this.validatorId}\n
        signature: ${this.signature}\n`.toString();
    return str;
  }

  /**
   * Set blockId
   */
  setBlockId(blockId: number): void {
    this.blockId = blockId;
  }

  /**
   * Set blockName
   */
  setBlockName(blockName: string): void {
    this.blockName = blockName;
  }

  /**
   * Set timestamp and recalculate hash
   * Reset validity
   */
  setTimestamp(timestamp: string): void {
    this.timestamp = timestamp;
    this.hash = BlockObj.calculateHash(this);
    this.valid = false;
  }

  /**
   * Set valid status of block
   */
  setValid(valid: boolean): void {
    this.valid = valid;
  }

  /**
   * Set blockData, update timestamp and recalculate hash
   * Reset validity
   */
  setBlockData(blockData: string): void {
    this.blockData = blockData;
    this.timestamp = String(Date.now());
    this.hash = BlockObj.calculateHash(this);
    this.valid = false;
  }

  /**
   * Set hash
   * Reset validity
   */
  setHash(hash: string): void {
    this.hash = hash;
    this.valid = false;
  }

  /**
   * Set last block's hash and recalculate hash
   * Reset validity
   */
  setLastHash(lastHash: string): void {
    this.lastHash = lastHash;
    this.hash = BlockObj.calculateHash(this);
    this.valid = false;
  }

  /**
   * Set validatorId
   */
  setValidatorId(validatorId: number): void {
    this.validatorId = validatorId;
  }

  /**
   * Set signature
   */
  setSignature(signature: string): void {
    this.signature = signature;
  }

  // Use to generate the genesis block
  static genesisBlock(): BlockObj {
    return new this(
      0,
      'genesis block',
      'genesis time', // Note: need this as a constant for validity checking
      true,
      '',
      'genesis hash',
      '---',
      -1,
      'genesis signature'
    );
  }

  // Generate hash for given block info
  // TODO: incorporate blockname into hash or remove blockname param?
  static hash(timestamp: string, lastHash: string, blockData: string): string {
    return CryptoJS.SHA256(`${timestamp}${lastHash}${blockData}`).toString(
      CryptoJS.enc.Hex
    ); // TODO: want encoded? ie. toString(CryptoJS.enc.Hex);
  }

  /**
   * Given a BlockObj, calculate the expected hash
   * @param block BlockObj
   * @returns hash as a string
   */
  static calculateHash(block: BlockObj): string {
    return BlockObj.hash(block.timestamp, block.lastHash, block.blockData);
  }

  static createBlock(blockId: number, lastBlock: BlockObj, blockData: string): BlockObj {
    let timestamp = String(Date.now());
    const lastHash = lastBlock.hash;
    let hash = BlockObj.hash(timestamp, lastHash, blockData);
    return new this(
      blockId,
      blockId.toString(),
      timestamp,
      false,
      blockData,
      hash,
      lastHash,
      -1,
      ''
    );
  }
}
