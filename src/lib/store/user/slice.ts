import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppUser, UserState } from './types';

export const userSliceName = 'user';

const initialState: UserState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: userSliceName,
  initialState,
  reducers: {
    setToken: (state: UserState, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state: UserState, action: PayloadAction<AppUser>) => {
      state.user = action.payload;
    },
    removeUser: (state: UserState) => {
      state.user = null;
      state.token = null;
    },
  },
});
