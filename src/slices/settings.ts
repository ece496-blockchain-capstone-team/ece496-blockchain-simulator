import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const settings = createSlice({
  name: 'settings',
  initialState: {
    stakeDeposit: null,
    valSelectionAlgo: null,
    maliciousBehavior: null,
    antiMaliciousAlgo: null,
    maxBlockSize: null,
  },
  reducers: {
    setSetting: (state, action: PayloadAction<{ name: any; value: any }>) => {
      // state[action.payload.name] = action.payload.value;
    },
  },
});

export default settings;
