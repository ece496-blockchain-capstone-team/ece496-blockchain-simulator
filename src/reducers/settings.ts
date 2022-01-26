import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

import { Network } from '../services';

const setSetting = createAction<{ name: any; value: any }, 'setSetting'>('setSetting');

const networkReducer = createReducer(
  {
    stakeDeposit: null,
    valSelectionAlgo: null,
    maliciousBehavior: null,
    antiMaliciousAlgo: null,
    maxBlockSize: null,
  },
  {
    [setSetting.type]: (state, action: PayloadAction<{ name: any; value: any }>) => {
      // state[action.payload.name] = action.payload.value;
    },
  }
);

export default networkReducer;
