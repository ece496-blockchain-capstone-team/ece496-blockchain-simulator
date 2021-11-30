import React from 'react';
import ConnectionObj from './Connections';
import HostRole from './HostType';
import ChainObj from './Chain';

export default class Host {
    nodeId: number;
    nodeName: string;
    userStake: number;
    role: HostRole;
    locationIds: 0;
    connections: ConnectionObj[] = [];
    lastValdationTime: 0;
    lastUpdatedTime: 0;
    lastActionTime: 0;
    validatorProbability: 0;
    chain: ChainObj;



    constructor(id: number, role: HostRole, connectedNodes: number[]) {
        this.nodeId = id;
        this.nodeName = "Test";
        this.userStake = 0;
        this.role = role;
        this.chain = new ChainObj();
        // set connections
        for (let i = 0; i < connectedNodes.length; i++){
            let tempConnections = new ConnectionObj(id, connectedNodes[i], 1);
            this.connections.push(tempConnections);
        }
    };

    getId() {
        console.log(this.nodeId);
        return this.nodeId;
    };

    removeDup(element: any, index: any, array: any){
            return (element !== this.nodeId);
    };

    getConnectedNodeIds(){
        let tempNodes: number[] = [];
        for (let i = 0; i < this.connections.length; i++){
            for (let j = 0; j < this.connections[i].nodeIds.length; j++){
                if (this.connections[i].nodeIds[j] !== this.nodeId){
                    tempNodes.push(this.connections[i].nodeIds[j]);
                }
            }
        }
        return tempNodes.join(', ');
    };

    getChain(){
        return this.chain;
    };

    updateChain(){

    };

    brodcastTransaction(){

    };

    validateBlock(){
        
    };
}
