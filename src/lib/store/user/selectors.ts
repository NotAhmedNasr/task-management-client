import { AppRootState } from '../types';

export const selectUser = (state: AppRootState) => state.user.user;
export const selectToken = (state: AppRootState) => state.user.token;
