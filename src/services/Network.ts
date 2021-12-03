import Host from './Host';
import ConnectionObj from './Connections';
import HostRole from './HostType';

export default class NetworkObj {
  networkId: 1;
  nodeList: Host[] = [];
  settings: any = {};

  constructor(numNodes: number) {
    this.networkId = 1;
    // for (let nodeid = 0; nodeid < numNodes; nodeid++){
    //     let hostRole = new HostRole("general");
    //     let tempHost = new Host(nodeid, hostRole, []);
    //     this.nodeList.push(tempHost);
    // };

    let hostRole = new HostRole('general');
    let tempHost = new Host(0, hostRole, [2, 4]);
    let tempHost2 = new Host(1, hostRole, [2, 0, 3]);
    let tempHost3 = new Host(2, hostRole, [1, 4, 0]);
    let tempHost4 = new Host(3, hostRole, [1, 4, 2]);
    let tempHost5 = new Host(4, hostRole, [2, 3]);
    tempHost.addConnectedNodes(tempHost2);
    tempHost.addConnectedNodes(tempHost5);
    this.nodeList.push(tempHost);
    tempHost2.addConnectedNodes(tempHost3);
    tempHost2.addConnectedNodes(tempHost);
    tempHost2.addConnectedNodes(tempHost4);
    this.nodeList.push(tempHost2);
    tempHost3.addConnectedNodes(tempHost2);
    tempHost3.addConnectedNodes(tempHost5);
    tempHost3.addConnectedNodes(tempHost);
    this.nodeList.push(tempHost3);
    tempHost4.addConnectedNodes(tempHost2);
    tempHost4.addConnectedNodes(tempHost5);
    tempHost4.addConnectedNodes(tempHost3);
    this.nodeList.push(tempHost4);
    tempHost5.addConnectedNodes(tempHost3);
    tempHost5.addConnectedNodes(tempHost4);
    this.nodeList.push(tempHost5);

    this.settings.stakeDeposit = null;
    this.settings.valSelectionAlgo = null;
    this.settings.maliciousBehavior = null;
    this.settings.antiMaliciousAlgo = null;
    this.settings.maxBlockSize = null;
  }

  timeStep(steps: number) {
    for (let i = 0; i < steps; i++) {
      console.log('Time Step');
    }
  }

  getId() {
    console.log(this.nodeList);
    return 1;
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
