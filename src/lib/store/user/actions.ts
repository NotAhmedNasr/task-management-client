import { getActionTypes } from '../types';
import { userSlice, userSliceName } from './slice';

export const { setToken, setUser, removeUser } = userSlice.actions;
export const userActionTypes = getActionTypes(userSliceName, userSlice.actions);
