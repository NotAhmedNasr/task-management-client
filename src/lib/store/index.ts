import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userStore';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

const rootState = combineReducers({
  user: userReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppRootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
