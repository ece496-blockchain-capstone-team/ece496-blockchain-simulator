import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { parse } from 'path';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

import { Host, Network, Connection, ConnectionType, ConnectionId } from '../services';

function findNewId(table: { [key: number]: any }) {
  const highestId = parseInt(
    Object.keys(table).reduce((prev, curr) =>
      parseInt(prev, 10) > parseInt(curr, 10) ? prev : curr
    ),
    10
  );

  return highestId + 1;
}

const network = createSlice({
  name: 'network',
  initialState: {
    validator: null,
    nodes: {},
    locations: {},
    connections: {},
    timeCounter: 0,
  } as Network,
  reducers: {
    timestep: (state, action: PayloadAction<number>) => {
      const stepAmount = action.payload;

      state.timeCounter += stepAmount;
      Object.values(state.nodes).forEach((node) => node.getAction(state.timeCounter)); // TODO: Only retrieves action, need to perform it in a way that does not mutate!!
    },
    init: (state, action: PayloadAction<void>) => {
      // Create new nodes
      const hostA = new Host(0, 'Host A', 0, 0, undefined);
      const hostB = new Host(1, 'Host B', 1, 0, undefined);

      // Create a new connection between the two
      const con = new Connection(0, 1, 10);
      con.id = 0;

      return {
        timeCounter: 1,
        validator: 0,
        locations: {
          0: {
            id: 0,
            latitude: 37.54560327062006,
            longitude: -77.44554131810912,
          },
          1: {
            id: 1,
            latitude: 47.673416976459634,
            longitude: -122.11814177692641,
          },
        },
        connections: {
          0: con,
        },
        nodes: {
          0: hostA,
          1: hostB,
        },
      };
    },
    chooseValidator: (state, action: PayloadAction<void>) => {
      let randomNum = Math.floor(Math.random() * Object.values(state.nodes).length);
      state.validator = Object.values(state.nodes)[randomNum].getId();
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

export default network;
