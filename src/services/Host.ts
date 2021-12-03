import React from 'react';
import ConnectionObj from './Connections';
import HostRole from './HostType';
import ChainObj from './Chain';
import Actions from './actions';

export default class Host {
  nodeId: number;
  nodeName: string;
  userStake: number;
  role: HostRole;
  locationIds: 0;
  connections: ConnectionObj[] = [];
  connectedNodes: Host[] = [];
  lastValdationTime: 0;
  lastUpdatedTime: 0;
  lastActionTime: 0;
  validatorProbability: 0;
  chain: ChainObj;
  actionQueue: Actions;

  constructor(id: number, role: HostRole, connectedNodes: number[]) {
    this.nodeId = id;
    this.nodeName = 'Test';
    this.userStake = 0;
    this.role = role;
    this.chain = new ChainObj();
    // set connections
    for (let i = 0; i < connectedNodes.length; i++) {
      let tempConnections = new ConnectionObj(id, connectedNodes[i], 1);
      this.connections.push(tempConnections);
    }
    this.actionQueue = new Actions();
  }

  addConnectedNodes(node: Host) {
    this.connectedNodes.push(node);
  }

  takeAction() {
    // let nextActoin = this.actionQueue.getNextAction;
    // if (nextActoin === 'brodcast'){
    //     this.brodcastTransaction()
    // }
  }

  getId() {
    return this.nodeId;
  }

  removeDup(element: any, index: any, array: any) {
    return element !== this.nodeId;
  }

  getConnectedNodeIds() {
    let tempNodes: number[] = [];
    for (let i = 0; i < this.connections.length; i++) {
      for (let j = 0; j < this.connections[i].nodeIds.length; j++) {
        if (this.connections[i].nodeIds[j] !== this.nodeId) {
          tempNodes.push(this.connections[i].nodeIds[j]);
        }
      }
    }
    return tempNodes.join(', ');
  }

  addBlock() {
    console.log('adding block');
    this.chain.addBlock();
    // this.brodcastTransaction(this.chain);
  }

  getChain() {
    return this.chain;
  }

  updateChain(vrsn: ChainObj) {
    if (this.chain.version > vrsn.version) {
      return true;
    }
    this.chain.updateChain(vrsn);
    this.brodcastTransaction(vrsn);
    return true;
  }

  brodcastTransaction(vrsn: ChainObj) {
    for (let i = 0; i < this.connectedNodes.length; i++) {
      this.connectedNodes[i].updateChain(vrsn);
    }
  }

  validateBlock() {}
}
