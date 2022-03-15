import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const metrics = createSlice({
  name: 'metrics',
  initialState: {
    // Set initial state and values
    numNodes: 0,
    numMaliciousNodes: 0,
    /*
    Number of blocks added to ledger per second
    After simulator is run for N blocks,
    if a block reaches a quorum, it is considered as added
    */
    throughput: 0, // blocks per second
    /*
    Time from client to send a transaction to finally be appended on the ledger.
    Assume client to nearest validator time to be negligible or a small constant.
    In future, this could also account for time to transmit the transactions
    to the mempool too.
    Run simulator for N (maybe 10000) blocks
    */
    finality: 0, // seconds
    /*
    Number of validators that would need to collude together to slow down or
    block the blockchain from functioning properly.
    Depends on config of network and protocol
    Calculated from config
    */
    nakomotoCoeff: 0, // number of nodes
  },
  reducers: {
    // actions are called by react component that trigger reducer
    // implement actions
    // action.payload is value passed in by button
    setNumNodes: (state, action: PayloadAction<number>) => {
      state.numNodes = action.payload;
    },
    setNumMaliciousNodes: (state, action: PayloadAction<number>) => {
      state.numMaliciousNodes = action.payload;
    },
    setThroughput: (state, action: PayloadAction<number>) => {
      state.throughput = action.payload;
    },
    setFinality: (state, action: PayloadAction<number>) => {
      state.finality = action.payload;
    },
    setNakomotoCoeff: (state, action: PayloadAction<number>) => {
      state.nakomotoCoeff = action.payload;
    },
  },
});

export default metrics;
