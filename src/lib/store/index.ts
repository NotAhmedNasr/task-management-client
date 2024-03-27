import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/reducer';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';

const rootState = combineReducers({
  user: userReducer,
});

export const makePersistedStore = () => {
  const store = configureStore({
    reducer: rootState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });

  return {
    store,
    persistor: persistStore(store),
  };
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makePersistedStore>['store'];
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppRootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
