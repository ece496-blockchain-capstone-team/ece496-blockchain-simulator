import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

import { Network } from '../services';

const timeStep = createAction<number, 'timestep'>('timestep');
const initNetwork = createAction<void, 'initNetwork'>('initNetwork');
const chooseValidator = createAction<void, 'chooseValidator'>('chooseValidator');

const networkReducer = createReducer(
  {
    nodeList: [],
    timeCounter: 0,
  } as Network,
  {
    [timeStep.type]: (state, action: PayloadAction<number>) => {
      const stepAmount = action.payload;

      state.timeCounter += stepAmount;
      for (let i = 0; i < state.nodeList.length; i++) {
        state.nodeList[i].takeAction(state.timeCounter);
      }
    },
    [initNetwork.type]: (state, action) => {
      state.timeCounter = 1;
      // for (let nodeid = 0; nodeid < numNodes; nodeid++){
      //     let hostRole = new HostRole("general");
      //     let tempHost = new Host(nodeid, hostRole, []);
      //     this.nodeList.push(tempHost);
      // };

      // let hostRole = new HostRole('general');
      // let tempHost = new Host(0, hostRole, [2, 4]);
      // let tempHost2 = new Host(1, hostRole, [2, 0, 3]);
      // let tempHost3 = new Host(2, hostRole, [1, 4, 0]);
      // let tempHost4 = new Host(3, hostRole, [1, 4, 2]);
      // let tempHost5 = new Host(4, hostRole, [2, 3]);
      // tempHost.addConnectedNodes(tempHost3);
      // tempHost.addConnectedNodes(tempHost5);
      // state.nodeList.push(tempHost);
      // tempHost2.addConnectedNodes(tempHost3);
      // tempHost2.addConnectedNodes(tempHost);
      // tempHost2.addConnectedNodes(tempHost4);
      // state.nodeList.push(tempHost2);
      // tempHost3.addConnectedNodes(tempHost2);
      // tempHost3.addConnectedNodes(tempHost5);
      // tempHost3.addConnectedNodes(tempHost);
      // state.nodeList.push(tempHost3);
      // tempHost4.addConnectedNodes(tempHost2);
      // tempHost4.addConnectedNodes(tempHost5);
      // tempHost4.addConnectedNodes(tempHost3);
      // state.nodeList.push(tempHost4);
      // tempHost5.addConnectedNodes(tempHost3);
      // tempHost5.addConnectedNodes(tempHost4);
      // state.nodeList.push(tempHost5);
    },
    [chooseValidator.type]: (state, action) => {
      let randomNum = Math.floor(Math.random() * state.nodeList.length);
      console.log(randomNum);
    },
  }
);

export default networkReducer;
