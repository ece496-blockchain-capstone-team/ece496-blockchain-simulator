import { Block } from 'typescript';
import BlockObj from './Block';

export default class ChainObj {
  private chainId: number;
  private version: number;
  private chain: BlockObj[];

  constructor() {
    this.version = 1;
    this.chain = [BlockObj.genesisBlock()];
  }

  // ***************************************************************************
  // Block related operations
  // ***************************************************************************
  /**
   * Get last block of blockchain
   * @returns BlockObj of last block
   */
  getLastBlock(): BlockObj {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Get last block and add new block to end of chain
   */
  addBlock(blockData: string): BlockObj {
    this.version += 1;
    const lastBlock = this.getLastBlock();
    const newBlock = BlockObj.createBlock(
      lastBlock.getBlockId() + 1,
      lastBlock,
      blockData
    );
    this.chain.push(newBlock);
    return newBlock;
  }

  // ***************************************************************************
  // Chain related operations
  // ***************************************************************************

  /**
   * Gets chain id
   * @returns chain id
   */
  getChainId(): number {
    return this.chainId;
  }

  /**
   * Gets chain version
   * @returns chain verison
   */
  getVersion(): number {
    return this.version;
  }

  /**
   * Gets chain as list of blockObj
   * @returns chain
   */
  getChain(): BlockObj[] {
    return this.chain;
  }

  /**
   * Given a blockchain, return whether it is valid or not
   * If the first block is not the genesis block, it is invalid
   * Then, check each block and ensure that the hashes are correct for validity
   * @param chain
   * @returns boolean of validity of chain
   */
  checkValidChain(blockchain: ChainObj): boolean {
    // Check genesis block
    if (blockchain.chain.length < 1) {
      return false;
    }
    if (JSON.stringify(blockchain.chain[0]) !== JSON.stringify(BlockObj.genesisBlock())) {
      return false;
    }

    // Traverse rest of blocks ensuring hash validity
    for (let i = 1; i < blockchain.chain.length; i++) {
      const currBlock = blockchain.chain[i];
      const prevBlock = blockchain.chain[i - 1];
      if (
        currBlock.getLastHash() !== prevBlock.getHash() ||
        currBlock.getHash() !== BlockObj.calculateHash(currBlock)
      ) {
        return false;
      }
    }
    return true;
  }

  /**
   * Given another chain object, check if their version is newer, if so,
   * then update this chain's version and return true
   * TODO: deprecate this function and use replaceChain
   * @param refChain
   * @returns boolean of whether or not passed in chain is newer
   */
  updateChain(refChain: ChainObj): boolean {
    if (refChain.version > this.version) {
      this.version = refChain.version;
      return true;
    }
    return false;
  }

  /**
   * Given a second chain, if the second chain is longer than the current chain,
   * then update the current chain
   * @param newChain
   * @returns boolean of whether or not chain replaced
   */
  replaceChain(newChain: ChainObj): boolean {
    if (newChain.chain.length <= this.chain.length) {
      console.log('Warning: new chain length shorter than current chain.');
      return false;
    }
    // Check validity of new chain
    if (!this.checkValidChain(newChain)) {
      console.log('Error: new chain invalid.');
      return false;
    }
    this.chain = newChain.chain;
    return true;
  }

  /**
   * Forcibly replace the chain with the new chain regardless of whether it's
   * valid or not
   * @param newChain
   */
  forceReplaceChain(newChain: ChainObj) {
    this.chain = newChain.chain;
  }
}
