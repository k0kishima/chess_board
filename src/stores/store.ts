import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from 'react-redux';

import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  // TODO: このワークアラウンド対応をやめる
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof rootReducer>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
