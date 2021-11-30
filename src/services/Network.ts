import Host from "./Host";
import ConnectionObj from "./Connections";
import HostRole from "./HostType";

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

        let hostRole = new HostRole("general");
        let tempHost = new Host(0, hostRole, [2, 4]);
        this.nodeList.push(tempHost);
        tempHost = new Host(1, hostRole, [2, 0, 3]);
        this.nodeList.push(tempHost);
        tempHost = new Host(2, hostRole, [1, 4, 0]);
        this.nodeList.push(tempHost);
        tempHost = new Host(3, hostRole, [1, 4, 2]);
        this.nodeList.push(tempHost);
        tempHost = new Host(4, hostRole, [2, 3]);
        this.nodeList.push(tempHost);


        this.settings.stakeDeposit = null;
        this.settings.valSelectionAlgo = null;
        this.settings.maliciousBehavior = null;
        this.settings.antiMaliciousAlgo = null;
        this.settings.maxBlockSize = null;
    };

    getId() {
        console.log(this.nodeList);
        return 1;
    };

    getHosts() {
        return this.nodeList;
    }

    chooseValidator() {
        let randomNum = Math.floor((Math.random() * (this.nodeList.length)));
        // console.log(randomNum);
        return randomNum;

    }
}
