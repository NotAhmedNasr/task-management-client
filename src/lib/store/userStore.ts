import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

// const cacheUser = (user: any) =>
//   localStorage.setItem('user', JSON.stringify(user));
// const cacheToken = (token: string | null) =>
//   localStorage.setItem('token', JSON.stringify(token));

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    removeUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default persistReducer(
  { key: 'user', storage, timeout: 1000 },
  userSlice.reducer,
);
