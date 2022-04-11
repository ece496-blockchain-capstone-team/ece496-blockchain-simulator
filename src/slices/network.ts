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
          actionObj.time = state.timeCounter;
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
    // state.finality = state.viewNumber / state.timeCounter;
    state.throughput = (state.viewNumber / (state.timeCounter / 100)).toFixed(10);
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
    finality: 0,
    throughput: 0,
    latencyMatrix: {},
    totalNodes: 0,
    totalMaliciousNodes: 0,
    nakamotoCoeff: 1,
  } as Network,
  reducers: {
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
        finality: 0,
        throughput: 0,
        totalNodes: 0,
        totalMaliciousNodes: 0,
        nakamotoCoeff: 1,
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

      state.totalNodes = tempTotalNodes;
      // state.nakamotoCoeff =
      console.log(state.actionQueue);
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
