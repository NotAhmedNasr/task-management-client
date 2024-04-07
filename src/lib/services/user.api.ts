import { AppUser } from '../store/user/types';
import axiosInstance from './axios/instance';

interface GetUserOptions {
  token: string;
}

export const getUser = ({ token }: GetUserOptions) => {
  return axiosInstance.get<AppUser>('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
