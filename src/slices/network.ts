import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { parse } from 'path';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

import {
  Host,
  Network,
  Connection,
  ConnectionType,
  ConnectionId,
  NodeId,
} from '../services';
import Actions from '../services/Actions';

function findNewId(table: { [key: number]: any }) {
  const highestId = parseInt(
    Object.keys(table).reduce((prev, curr) =>
      parseInt(prev, 10) > parseInt(curr, 10) ? prev : curr
    ),
    10
  );

  return highestId + 1;
}

function findLatencyBetweenNodes(state: any, node1: number, node2: number) {
  return state.latencyMatrix[state.locations[node1].id][state.locations[node2].id];
}

function sim(state: any, time: any) {
  for (let step = 0; step < time; step++) {
    let curActions = state.actionQueue.getActions(state.timeCounter);

    for (let i = 0; i < curActions.length; i++) {
      state.logs = i;
      if (i in curActions) {
        for (let j = 0; j < curActions[i].length; j++) {
          let response = state.nodes[i].processAction(curActions[i][j]);
          state.logs = curActions.length;
          let actionObj: any = {};
          actionObj.act = response.message;
          actionObj.sender = i;
          if (Object.keys(response).length === 0) {
            // console.log("No action");
          } else if (response.action === 'brodcast') {
            actionObj.blockObj = response.blockObj;
            // console.log(response.message)
            if (response.message === 'decide') {
              actionObj.viewNum = response.viewNum;
              state.viewNumber += 1;
              state.leader = state.viewNumber % state.totalNodes;
              // console.log("Decide")
              // console.log(state.leader)
              // console.log(actionObj)
            }
            for (let a = 0; a < state.totalNodes; a++) {
              if (a !== i) {
                // state.actionQueue.addActions(a, state.timeCounter + response.processingDelay, [i + ' ' + response.message]);
                state.actionQueue.addActions(
                  a,
                  state.timeCounter +
                    response.processingDelay +
                    findLatencyBetweenNodes(state, a, i),
                  [actionObj]
                );
              }
            }
          } else if (response.action === 'new-view') {
            // state.actionQueue.addActions(state.leader, state.timeCounter + response.processingDelay, [i + ' ' + response.message]);
            state.actionQueue.addActions(
              state.leader,
              state.timeCounter +
                response.processingDelay +
                findLatencyBetweenNodes(state, state.leader, i),
              [actionObj]
            );
          } else {
            // state.actionQueue.addActions(response.targetNode, state.timeCounter + response.processingDelay, [i + ' ' + response.message]);
            state.actionQueue.addActions(
              response.targetNode,
              state.timeCounter +
                response.processingDelay +
                findLatencyBetweenNodes(state, response.targetNode, i),
              [actionObj]
            );
          }
        }
      }
    }

    const stepAmount = time;
    // state.timeCounter += stepAmount;
    state.timeCounter += 1;
    state.latency = state.viewNumber / state.timeCounter;
    state.throughput = state.viewNumber / (state.timeCounter / 100);
  }
}

function findRandomLocation(cityId: number) {
  let maxOffset = 1000000000;
  let randomLatOffset = Math.floor(Math.random() * (maxOffset + 1)) / (maxOffset * 3);
  let randomLonOffset = Math.floor(Math.random() * (maxOffset + 1)) / (maxOffset * 3);
  switch (cityId) {
    case 0: {
      // toronto
      return [43.750405 + randomLatOffset, -79.369139 + randomLonOffset];
    }
    case 1: {
      // New York
      return [40.726969 + randomLatOffset, -73.888404 + randomLonOffset];
    }
    case 2: {
      // Los Angeles
      return [34.077825 + randomLatOffset, -118.281565 + randomLonOffset];
    }
    case 3: {
      // Mumbai
      return [19.153387 + randomLatOffset, 72.892558 + randomLonOffset];
    }
    case 4: {
      // Cape Town
      return [-33.952821 + randomLatOffset, 18.575008 + randomLonOffset];
    }
    case 5: {
      // Moscow
      return [55.744967 + randomLatOffset, 37.616155 + randomLonOffset];
    }
    default: {
      return [43.750405 + randomLatOffset, -79.369139 + randomLonOffset];
    }
  }
}

function setupNewNode(state: any, nodeNum: any, location: any, totalNodes: any) {
  console.log('Adding new nodes');
  let nodeName = 'Host ' + nodeNum;
  console.log(nodeName);
  const host = new Host(nodeNum, nodeName, 0, 0, 0, totalNodes, undefined, undefined);

  // Connect new nodes together
  let connectedArray = [];
  for (let i = 0; i < totalNodes; i++) {
    if (nodeNum !== i) {
      connectedArray.push(i);
    }
  }
  host.addConnectedNodes(connectedArray);

  let actQ = state.actionQueue;
  let actionObj: any = {};
  actionObj.act = 'new-view';
  actionObj.sender = 1;
  actQ.addActions(0, 2, [actionObj]);

  state.nodes[nodeNum] = host;

  let [tempLat, tempLon] = findRandomLocation(location);

  state.locations[nodeNum] = {
    id: location,
    latitude: tempLat,
    longitude: tempLon,
  };
}

const network = createSlice({
  name: 'network',
  initialState: {
    validator: null,
    nodes: {},
    locations: {},
    connections: {},
    timeCounter: 0,
    viewNumber: 0,
    leader: 0,
    actionQueue: {},
    logs: null,
    latency: 0,
    throughput: 0,
    latencyMatrix: {},
    totalNodes: 0,
  } as Network,
  reducers: {
    // init: (state, action: PayloadAction<void>) => {
    //   // Create new nodes
    //   // const hostA = new Host(0, 'Host A', 0, 0, undefined);
    //   // const hostB = new Host(1, 'Host B', 1, 0, undefined);
    //   const hostA = new Host(0, 'Host A', 0, 0, 0, undefined, undefined);
    //   const hostB = new Host(1, 'Host B', 1, 0, 0, undefined, undefined);
    //   const hostC = new Host(2, 'Host C', 2, 0, 0, undefined, undefined);
    //   const hostD = new Host(3, 'Host D', 3, 0, 0, undefined, undefined);
    //   const hostE = new Host(4, 'Host E', 4, 0, 0, undefined, undefined);
    //   const hostF = new Host(5, 'Host F', 5, 0, 0, undefined, undefined);

    //   // Connect new nodes together
    //   hostA.addConnectedNodes([1, 2, 3, 4, 5]);
    //   hostB.addConnectedNodes([0, 2, 3, 4, 5]);
    //   hostC.addConnectedNodes([0, 1, 3, 4, 5]);
    //   hostD.addConnectedNodes([0, 1, 2, 4, 5]);
    //   hostE.addConnectedNodes([0, 1, 2, 3, 5]);
    //   hostF.addConnectedNodes([0, 1, 2, 3, 4]);

    //   // hostA.setRoleLeader();
    //   let actQ = new Actions();
    //   let actionObj: any = {}
    //   actionObj.act = 'new-view';
    //   actionObj.sender = 1;
    //   actQ.addActions(0, 2, [actionObj]);
    //   actQ.addActions(0, 2, [actionObj]);
    //   actQ.addActions(0, 2, [actionObj]);
    //   actQ.addActions(0, 2, [actionObj]);
    //   actQ.addActions(0, 2, [actionObj]);
    //   actQ.addActions(0, 2, [actionObj]);

    //   // Create a new connection between the two
    //   const con0 = new Connection(0, 1, 10);
    //   const con1 = new Connection(0, 2, 10);
    //   const con2 = new Connection(0, 3, 10);
    //   const con3 = new Connection(0, 4, 10);
    //   const con4 = new Connection(2, 5, 10);
    //   const con5 = new Connection(2, 1, 10);
    //   con0.id = 0;

    //   return {
    //     timeCounter: 1,
    //     viewNumber: 0,
    //     leader: 0,
    //     validator: 0,
    //     actionQueue: actQ,
    //     locations: {
    //       0: {
    //         id: 1,
    //         latitude: 37.54560327062006,
    //         longitude: -77.44554131810912,
    //       },
    //       1: {
    //         id: 1,
    //         latitude: 47.673416976459634,
    //         longitude: -122.11814177692641,
    //       },
    //       2: {
    //         id: 1,
    //         latitude: 57.54560327062006,
    //         longitude: -67.44554131810912,
    //       },
    //       3: {
    //         id: 1,
    //         latitude: 38.9845498662006,
    //         longitude: -87.44554131810912,
    //       },
    //       4: {
    //         id: 1,
    //         latitude: 45.673416976459634,
    //         longitude: -112.11814177692641,
    //       },
    //       5: {
    //         id: 1,
    //         latitude: 51.54560327062006,
    //         longitude: -71.44554131810912,
    //       },
    //     },
    //     connections: {
    //       0: con0,
    //       1: con1,
    //       2: con2,
    //       3: con3,
    //       4: con4,
    //       5: con5,
    //     },
    //     nodes: {
    //       0: hostA,
    //       1: hostB,
    //       2: hostC,
    //       3: hostD,
    //       4: hostE,
    //       5: hostF,
    //     },
    //     logs: null,
    //   };
    // },
    init: (state, action: PayloadAction<void>) => {
      let actQ = new Actions();
      return {
        timeCounter: 1,
        viewNumber: 0,
        leader: 0,
        validator: 0,
        actionQueue: actQ,
        locations: {},
        connections: {},
        nodes: {},
        logs: null,
        latency: 0,
        throughput: 0,
        totalNodes: 0,
        // latencies in x100ms
        latencyMatrix: {
          0: {
            0: 0,
            1: 2,
            2: 6,
            3: 21,
            4: 23,
            5: 13,
          },
          1: {
            0: 2,
            1: 0,
            2: 7,
            3: 19,
            4: 21,
            5: 12,
          },
          2: {
            0: 6,
            1: 7,
            2: 0,
            3: 24,
            4: 27,
            5: 19,
          },
          3: {
            0: 21,
            1: 19,
            2: 24,
            3: 0,
            4: 28,
            5: 17,
          },
          4: {
            0: 23,
            1: 21,
            2: 27,
            3: 33,
            4: 0,
            5: 19,
          },
          5: {
            0: 13,
            1: 12,
            2: 19,
            3: 17,
            4: 19,
            5: 0,
          },
        },
      };
    },
    setupNodes: (state, action: PayloadAction<any>) => {
      // total nodes
      let tempTotalNodes =
        action.payload.Toronto +
        action.payload.NewYork +
        action.payload.LosAngeles +
        action.payload.Mumbai +
        action.payload.CapeTown +
        action.payload.Moscow;
      // let tempTotalNodes = action.payload.Toronto;
      let tempCount = 0;
      for (let i = 0; i < action.payload.Toronto; i++) {
        setupNewNode(state, tempCount, 0, tempTotalNodes);
        tempCount++;
      }
      for (let i = 0; i < action.payload.NewYork; i++) {
        setupNewNode(state, tempCount, 1, tempTotalNodes);
        tempCount++;
      }
      for (let i = 0; i < action.payload.LosAngeles; i++) {
        setupNewNode(state, tempCount, 2, tempTotalNodes);
        tempCount++;
      }
      for (let i = 0; i < action.payload.Mumbai; i++) {
        setupNewNode(state, tempCount, 3, tempTotalNodes);
        tempCount++;
      }
      for (let i = 0; i < action.payload.CapeTown; i++) {
        setupNewNode(state, tempCount, 4, tempTotalNodes);
        tempCount++;
      }
      for (let i = 0; i < action.payload.Moscow; i++) {
        setupNewNode(state, tempCount, 5, tempTotalNodes);
        tempCount++;
      }
      console.log(tempTotalNodes);

      // state.totalNodes = 6;
      state.totalNodes = tempTotalNodes;
      console.log(state.actionQueue);

      // Create new nodes
      // const hostA = new Host(0, 'Host A', 0, 0, undefined);
      // const hostB = new Host(1, 'Host B', 1, 0, undefined);
      // const hostA = new Host(0, 'Host A', 0, 0, 0, state.totalNodes, undefined, undefined);
      // const hostB = new Host(1, 'Host B', 1, 0, 0, state.totalNodes, undefined, undefined);
      // const hostC = new Host(2, 'Host C', 2, 0, 0, state.totalNodes, undefined, undefined);
      // const hostD = new Host(3, 'Host D', 3, 0, 0, state.totalNodes, undefined, undefined);
      // const hostE = new Host(4, 'Host E', 4, 0, 0, state.totalNodes, undefined, undefined);
      // const hostF = new Host(5, 'Host F', 5, 0, 0, state.totalNodes, undefined, undefined);

      // // Connect new nodes together
      // hostA.addConnectedNodes([1, 2, 3, 4, 5]);
      // hostB.addConnectedNodes([0, 2, 3, 4, 5]);
      // hostC.addConnectedNodes([0, 1, 3, 4, 5]);
      // hostD.addConnectedNodes([0, 1, 2, 4, 5]);
      // hostE.addConnectedNodes([0, 1, 2, 3, 5]);
      // hostF.addConnectedNodes([0, 1, 2, 3, 4]);

      // // hostA.setRoleLeader();
      // let actQ = state.actionQueue;
      // let actionObj: any = {};
      // actionObj.act = 'new-view';
      // actionObj.sender = 1;
      // actQ.addActions(0, 2, [actionObj]);
      // actQ.addActions(0, 2, [actionObj]);
      // actQ.addActions(0, 2, [actionObj]);
      // actQ.addActions(0, 2, [actionObj]);
      // actQ.addActions(0, 2, [actionObj]);
      // actQ.addActions(0, 2, [actionObj]);

      // // Create a new connection between the two
      // const con0 = new Connection(0, 1, 10);
      // const con1 = new Connection(0, 2, 10);
      // const con2 = new Connection(0, 3, 10);
      // const con3 = new Connection(0, 4, 10);
      // const con4 = new Connection(2, 5, 10);
      // const con5 = new Connection(2, 1, 10);
      // con0.id = 0;

      // state.nodes[0] = hostA;
      // state.nodes[1] = hostB;
      // state.nodes[2] = hostC;
      // state.nodes[3] = hostD;
      // state.nodes[4] = hostE;
      // state.nodes[5] = hostF;

      // state.connections[0] = con0;
      // state.connections[1] = con1;
      // state.connections[2] = con2;
      // state.connections[3] = con3;
      // state.connections[4] = con4;
      // state.connections[5] = con5;

      // state.locations[0] = {
      //   id: 0,
      //   latitude: 37.54560327062006,
      //   longitude: -77.44554131810912,
      // };
      // state.locations[1] = {
      //   id: 1,
      //   latitude: 47.673416976459634,
      //   longitude: -122.11814177692641,
      // };
      // state.locations[2] = {
      //   id: 2,
      //   latitude: 57.54560327062006,
      //   longitude: -67.44554131810912,
      // };
      // state.locations[3] = {
      //   id: 3,
      //   latitude: 38.9845498662006,
      //   longitude: -87.44554131810912,
      // };
      // state.locations[4] = {
      //   id: 4,
      //   latitude: 45.673416976459634,
      //   longitude: -112.11814177692641,
      // };
      // state.locations[5] = {
      //   id: 5,
      //   latitude: 51.54560327062006,
      //   longitude: -71.44554131810912,
      // };
    },
    increment: (state) => {
      state.timeCounter += 1;
    },
    timestep: (state, action: PayloadAction<number>) => {
      sim(state, action.payload);
    },
    chooseValidator: (state, action: PayloadAction<void>) => {
      let randomNum = Math.floor(Math.random() * Object.values(state.nodes).length);
      state.validator = Object.values(state.nodes)[randomNum].getId();
    },
    test: (state, action: PayloadAction<void>) => {
      state.timeCounter = 50;
    },
    simulate: (state, action: PayloadAction<number>) => {
      let targetView = state.viewNumber + action.payload;
      while (state.viewNumber < targetView) {
        sim(state, 1);
      }
    },
    connect: (state, action: PayloadAction<ConnectionType>) => {
      const connection = action.payload;

      // Find and assign connection id
      const connectionId = findNewId(state.connections);
      connection.id = connectionId;

      // Find and assign connections to hosts
      const nodes = connection.nodeIds.map((id) => state.nodes[id]);
      nodes[0].connectionIds.push(connectionId);
      nodes[1].connectionIds.push(connectionId);

      // Add connection to state table
      state.connections[connectionId] = connection;
    },
    disconnect: (state, action: PayloadAction<ConnectionId>) => {
      const connectionId = action.payload;

      // Remove connection from nodes
      const nodes = state.connections[connectionId].nodeIds.map((id) => state.nodes[id]);
      nodes[0].connectionIds.splice(nodes[0].connectionIds.indexOf(connectionId), 1);
      nodes[1].connectionIds.splice(nodes[1].connectionIds.indexOf(connectionId), 1);

      // Remove connection from state table
      delete state.connections[connectionId];
    },
  },
});

export const { increment, simulate, timestep, setupNodes } = network.actions;

export default network;
