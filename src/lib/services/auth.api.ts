import axiosInstance from './axios/instance';
import { RegisterFormValues } from '@/lib/types/registration';
import { LoginFormValues } from '@/lib/types/login';

export const register = (data: Omit<RegisterFormValues, 'confirmPassword'>) => {
  return axiosInstance.post('/local/register', data);
};

export const login = ({ username, password }: LoginFormValues) => {
  return axiosInstance.post('/local/login', {
    identifier: username,
    password,
  });
};

export const googleLogin = (searchParams: Record<string, string>) => {
  return axiosInstance.get('/oauth2/redirect/google', {
    params: searchParams,
  });
};

export const verifyEmail = (token: string) => {
  return axiosInstance.get('/local/verify', { params: { token } });
};
