import { createSelector } from '@reduxjs/toolkit';
import fpIdentity from 'lodash/fp/identity';
import { AppRootState } from '.';

const selectUser = (state: AppRootState) => state.user.user;
const selectToken = (state: AppRootState) => state.user.token;

export const getUser = createSelector(selectUser, fpIdentity);
export const getToken = createSelector(selectToken, fpIdentity);
