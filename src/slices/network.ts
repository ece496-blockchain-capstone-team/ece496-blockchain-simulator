import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Host, Network } from '../services';

const network = createSlice({
  name: 'network',
  initialState: {
    validator: null,
    nodes: {},
    locations: {},
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
      const hostA = new Host(0, 'Host A', 0, 0, undefined, undefined);
      const hostB = new Host(1, 'Host B', 1, 0, undefined, undefined);

      // Connect new nodes together
      hostA.addConnectedNodes([1]);
      hostB.addConnectedNodes([0]);

      return {
        timeCounter: 1,
        validator: 0,
        locations: {
          0: {
            id: 0,
            latitude: 0,
            longitude: 0,
          },
          1: {
            id: 1,
            latitude: 0,
            longitude: 0,
          },
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
  },
});

export default network;
