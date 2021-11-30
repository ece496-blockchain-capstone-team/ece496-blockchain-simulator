export default class ConnectionObj {
    id: number;
    nodeIds: number[] = [];
    propagationTime: number;

    constructor(host1: number, host2: number, propagation?: number){
        this.nodeIds.push(host1);
        this.nodeIds.push(host2);
        if (propagation){
            this.propagationTime = propagation 
        } else {
            this.propagationTime = 1;
        }
    }
}