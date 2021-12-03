export default class ChainObj {
  version: number;

  constructor() {
    this.version = 1;
  }

  getVersion() {
    return this.version;
  }

  addBlock() {
    this.version += 1;
    return true;
  }

  updateChain(refChain: ChainObj) {
    if (refChain.version > this.version) {
      this.version = refChain.version;
      return true;
    }
    return false;
  }
}
