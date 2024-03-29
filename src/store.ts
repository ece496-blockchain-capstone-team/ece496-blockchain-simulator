import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { network, settings, metrics } from './slices';

export const store = configureStore({
  reducer: {
    network: network.reducer,
    settings: settings.reducer,
    metrics: metrics.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = (
  selectorFn: (state: RootState) => any,
  equalityFn?: (right: any, left: any) => boolean
) => useSelector<RootState>(selectorFn, equalityFn);
