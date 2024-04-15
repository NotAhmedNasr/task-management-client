import { AppUser } from '../store/user/types';
import axiosInstance from './axios/instance';

interface GetUserOptions {
  token: string;
}

interface UpdateUserOptions extends GetUserOptions {
  data: Partial<Pick<AppUser, 'firstName' | 'lastName'>>;
}
export const getUser = ({ token }: GetUserOptions) => {
  return axiosInstance.get<AppUser>('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = ({ token, data }: UpdateUserOptions) => {
  return axiosInstance.patch<AppUser>(
    '/users/me',
    {
      ...data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
