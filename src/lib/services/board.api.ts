import { GetManyResponseType } from '../types/api';
import { Board } from '../types/board';
import { promiseToErrResult } from '../utils/promiseToErrResult';
import axiosInstance from './axios/instance';

export const getBoardById = (id: string, token: string) => {
  const promise = axiosInstance.get<Board>(`/boards/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promiseToErrResult(promise);
};

export const getUserBoards = (token: string) => {
  const promise = axiosInstance.get<GetManyResponseType<Board>>('/boards', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promiseToErrResult(promise);
};
