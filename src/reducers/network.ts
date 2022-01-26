import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

import { Host, Network } from '../services';

const timeStep = createAction<number, 'timestep'>('timestep');
const initNetwork = createAction<void, 'initNetwork'>('initNetwork');
const chooseValidator = createAction<void, 'chooseValidator'>('chooseValidator');

const networkReducer = createReducer(
  {
    validator: null,
    nodes: [],
    locations: [],
    timeCounter: 0,
  } as Network,
  {
    [timeStep.type]: (state, action: PayloadAction<number>) => {
      const stepAmount = action.payload;

      state.timeCounter += stepAmount;
      Object.values(state.nodes).forEach((node) => node.getAction(state.timeCounter)); // TODO: Only retrieves action, need to perform it in a way that does not mutate!!
    },
    [initNetwork.type]: (state, action) => {
      state.timeCounter = 1;

      // Add new locations
      state.locations[0] = {
        id: 0,
        latitude: 0,
        longitude: 0,
      };

      state.locations[1] = {
        id: 1,
        latitude: 0,
        longitude: 0,
      };

      // Add new nodes
      state.nodes[0] = new Host(0, 'Test 1', 0, 0, undefined, undefined);

      state.nodes[1] = new Host(1, 'Test 2', 1, 0, undefined, undefined);

      // Connect new nodes together
      state.nodes[0].addConnectedNodes([1]);
      state.nodes[1].addConnectedNodes([0]);
    },
    [chooseValidator.type]: (state, action) => {
      let randomNum = Math.floor(Math.random() * Object.values(state.nodes).length);
      state.validator = Object.values(state.nodes)[randomNum].getId();
    },
  }
);

export default networkReducer;
