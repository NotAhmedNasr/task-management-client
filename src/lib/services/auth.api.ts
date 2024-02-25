import axios from 'axios';
import { RegisterFormValues } from '@/lib/types/registration';
import { LoginFormValues } from '@/lib/types/login';

const instance = axios.create({
  baseURL: process.env.BACKEND_URL,
});

export const register = (data: Omit<RegisterFormValues, 'confirmPassword'>) => {
  return instance.post('/local/register', data);
};

export const login = ({ username, password }: LoginFormValues) => {
  return instance.post('/local/login', {
    identifier: username,
    password,
  });
};

export const googleLogin = (searchParams: Record<string, string>) => {
  return instance.get('/oauth2/redirect/google', {
    params: searchParams,
  });
};

export const verifyEmail = (token: string) => {
  return instance.get('/local/verify', { params: { token } });
};
