import axiosInstance from './axios/instance';

interface GetUserOptions {
  token: string;
}

export const getUser = ({ token }: GetUserOptions) => {
  return axiosInstance.get('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
