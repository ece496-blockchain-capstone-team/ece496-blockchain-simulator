import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const settings = createSlice({
  name: 'settings',
  initialState: {
    stake: 1,
    electionAlgo: 1,
    votingPower: 1,
    antiMaliciousAlgo: 1,
    blockSize: 10,
  },
  reducers: {
    setStake: (state, action: PayloadAction<number>) => {
      state.stake = action.payload;
    },
    setElectionAlgo: (state, action: PayloadAction<number>) => {
      state.electionAlgo = action.payload;
    },
    setVotingPower: (state, action: PayloadAction<number>) => {
      state.votingPower = action.payload;
    },
    setAntiMaliciousAlgo: (state, action: PayloadAction<number>) => {
      state.antiMaliciousAlgo = action.payload;
    },
    setBlockSize: (state, action: PayloadAction<number>) => {
      state.blockSize = action.payload;
    },
  },
});

// export const { setStake, setElectionAlgo, setMaliciousBehavior, setAntiMaliciousAlgo, setBlockSize } = settings.actions;
export default settings;
