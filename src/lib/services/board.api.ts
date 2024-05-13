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
