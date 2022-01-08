import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  useSelector as rawUseSelector,
  useDispatch,
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

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
