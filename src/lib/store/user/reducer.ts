import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { userSlice } from './slice';

export default persistReducer(
  { key: 'user', storage, timeout: 1000 },
  userSlice.reducer,
);
