import { configureStore } from '@reduxjs/toolkit';

import { networkReducer, settingsReducer } from './reducers';

export const store = configureStore({
  reducer: {
    network: networkReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
