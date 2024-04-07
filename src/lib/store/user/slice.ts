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
    setUser: (
      state: UserState,
      action: PayloadAction<{ token: string; user: AppUser }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    removeUser: (state: UserState) => {
      state.user = null;
      state.token = null;
    },
  },
});
