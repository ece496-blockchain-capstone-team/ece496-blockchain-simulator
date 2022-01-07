import Host from './Host';
import ConnectionObj from './Connections';

export default class NetworkObj {
  networkId: 1;
  nodeList: Host[] = [];
  settings: any = {};
  timeCounter: number = 0;

  constructor(numNodes: number) {
    this.networkId = 1;
    this.timeCounter = 1;
    this.settings.stakeDeposit = null;
    this.settings.valSelectionAlgo = null;
    this.settings.maliciousBehavior = null;
    this.settings.antiMaliciousAlgo = null;
    this.settings.maxBlockSize = null;
  }

  timeStep(steps: number) {
    this.timeCounter += steps;
    console.log(this.timeCounter);
    for (let i = 0; i < this.nodeList.length; i++) {
      this.nodeList[i].getAction(this.timeCounter);
    }
  }

  getId() {
    console.log(this.nodeList);
    return 1;
  }

  getHostAndChain() {
    console.log(this.nodeList);
    for (let i = 0; i < this.nodeList.length; i++) {
      console.log(
        'Node ' +
          String(this.nodeList[i].getId()) +
          ': ' +
          String(this.nodeList[i].getChain().version)
      );
    }
    return 1;
  }

  getCurrentTime() {
    return this.timeCounter;
  }

  getHosts() {
    return this.nodeList;
  }

  chooseValidator() {
    let randomNum = Math.floor(Math.random() * this.nodeList.length);
    // console.log(randomNum);
    return randomNum;
  }
}
