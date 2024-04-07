import axiosInstance from './axios/instance';
import { RegisterFormValues } from '@/lib/types/registration';
import { LoginFormValues } from '@/lib/types/login';
import { AppUser } from '../store/user/types';

export const register = (data: Omit<RegisterFormValues, 'confirmPassword'>) => {
  return axiosInstance.post('/local/register', data);
};

interface LoginResponseData {
  token: string;
  user: AppUser;
}

export const login = async ({ username, password }: LoginFormValues) => {
  const { data } = await axiosInstance.post<LoginResponseData>('/local/login', {
    identifier: username,
    password,
  });
  return data;
};

export const googleLogin = (searchParams: Record<string, string>) => {
  return axiosInstance.get<LoginResponseData>('/oauth2/redirect/google', {
    params: searchParams,
  });
};

export const verifyEmail = (token: string) => {
  return axiosInstance.get<{ message: string }>('/local/verify', {
    params: { token },
  });
};
