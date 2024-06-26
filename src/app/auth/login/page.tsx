'use client';
import React from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { login } from '../../../lib/services/auth.api';
import LoginForm from '@/components/forms/login';
import GoogleLink from '@/components/links/oauth2/google';
import { LoginFormValues } from '@/lib/types/login';
import { setToken, setUser } from '@/lib/store/user/actions';
import { selectUser } from '@/lib/store/user/selectors';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import Link from 'next/link';

const Login: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  if (user) {
    location.href = '/';
  }

  const initialValues: LoginFormValues = {
    username: '',
    password: '',
  };

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const data = await login(values);
      dispatch(setToken(data.token));
      dispatch(setUser(data.user));
    } catch (error: unknown) {
      let errMessage = '';
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 400:
            errMessage = 'Invalid username or password';
            break;
          case 403:
            errMessage = 'Sorry, this user is blocked';
            break;
          default:
            errMessage = error.response?.data.message;
        }
      } else {
        errMessage = 'Unexpected error occurred. Try again later';
      }
      toast.error(errMessage);
    }
  };

  return (
    <>
      {!user && (
        <div className="max-w-lg mx-auto mt-32 p-6 bg-white rounded shadow">
          <h1 className="text-2xl font-bold mb-6 text-gray-600">Login</h1>
          <LoginForm onSubmit={onSubmit} initialValues={initialValues} />
          <p className="text-sm text-gray-900 mt-2">
            {`Don't have an account. `}
            <Link
              className="text-blue-500 hover:underline"
              href={'/auth/register'}
            >
              Register
            </Link>{' '}
            now!
          </p>
          <div className="flex gap-4 items-center my-2">
            <hr className="border-t border-gray-300 my-5 block flex-grow" />
            <div className="text-black">Or with social</div>
            <hr className="border-t border-gray-300 my-5 block flex-grow" />
          </div>
          <GoogleLink />
        </div>
      )}
    </>
  );
};

export default Login;
