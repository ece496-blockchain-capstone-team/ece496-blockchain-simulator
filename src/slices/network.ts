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
      const toronto = new Host(0, 'Toronto', 0, 10, undefined);
      const buenosaires = new Host(1, 'BuenosAires', 1, 10, undefined);
      const amsterdam = new Host(2, 'Amsterdam', 2, 10, undefined);
      const brisbane = new Host(3, 'Brisbane', 3, 10, undefined);
      const capetown = new Host(4, 'Capetown', 4, 10, undefined);
      const tokyo = new Host(5, 'Tokyo', 5, 10, undefined);

      return {
        timeCounter: 1,
        validator: 0,
        locations: {
          0: {
            id: 0,
            latitude: 43.6481,
            longitude: -79.4042,
          },
          1: {
            id: 1,
            latitude: -34.6036,
            longitude: -58.3817,
          },
          2: {
            id: 2,
            latitude: 52.3,
            longitude: 4.7,
          },
          3: {
            id: 3,
            latitude: -27.4667,
            longitude: 153.0333,
          },
          4: {
            id: 4,
            latitude: -33.9767,
            longitude: 18.4244,
          },
          5: {
            id: 5,
            latitude: 35.6833,
            longitude: 139.7667,
          },
        },
        connections: {},
        nodes: {
          0: toronto,
          1: buenosaires,
          2: amsterdam,
          3: brisbane,
          4: capetown,
          5: tokyo,
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
    addLocation: (
      state,
      action: PayloadAction<{ id?: number; latitude: number; logitude: number }>
    ) => {
      if (action.payload.id != null) {
        state.locations[action.payload.id] = {
          id: action.payload.id,
          latitude: action.payload.latitude,
          longitude: action.payload.logitude,
        };
      } else {
        let maxId = 0;
        Object.keys(state.locations).forEach((id) => {
          maxId = Math.max(maxId, +id);
        });
        state.locations[maxId + 1] = {
          id: maxId + 1,
          latitude: action.payload.latitude,
          longitude: action.payload.logitude,
        };
      }
    },
    removeLocation: (state, action: PayloadAction<{ id: number }>) => {
      delete state.locations[action.payload.id];
    },
    addHost: (
      state,
      action: PayloadAction<{
        name?: string;
        location: number;
        stake: number;
        role?: any;
      }>
    ) => {
      let maxId = 0;
      Object.keys(state.nodes).forEach((id) => {
        maxId = Math.max(maxId, +id);
      });
      let name = state.locations[action.payload.location].id + '-' + maxId;
      if (action.payload.name) {
        name = action.payload.name;
      }
      state.nodes[maxId + 1] = new Host(
        maxId + 1,
        name,
        action.payload.location,
        action.payload.stake,
        action.payload.role
      );
    },
    removeHost: (state, action: PayloadAction<{ id: number }>) => {
      delete state.nodes[action.payload.id];
    },
  },
});

export default network;
