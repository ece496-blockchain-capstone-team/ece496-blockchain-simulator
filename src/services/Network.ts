import Host from "./Host";
import ConnectionObj from "./Connections";
import HostRole from "./HostType";

export default class NetworkObj {
    
    networkId: 1;
    nodeList: Host[] = [];
    settings: any = {};

    constructor(numNodes: number) {
        this.networkId = 1;
        for (let nodeid = 0; nodeid < numNodes; nodeid++){
            let hostRole = new HostRole("general");
            let tempHost = new Host(nodeid, hostRole, []);
            this.nodeList.push(tempHost);                
        };
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

    chooseValidator(){
        let randomNum = Math.floor((Math.random() * (this.nodeList.length)));
        // console.log(randomNum);
        return randomNum;

    }
}
