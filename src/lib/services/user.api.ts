import { AppUser } from '../store/user/types';
import { promiseToErrResult } from '../utils/promiseToErrResult';
import axiosInstance from './axios/instance';

interface GetUserOptions {
  token: string;
}

interface UpdateUserOptions extends GetUserOptions {
  data: Partial<Pick<AppUser, 'firstName' | 'lastName'>>;
}
export const getUser = ({ token }: GetUserOptions) => {
  const requestPromise = axiosInstance
    .get<AppUser>('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data);

  return promiseToErrResult(requestPromise);
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
