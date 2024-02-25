'use client';
import React from 'react';
import { AxiosError } from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { login } from '../../../lib/services/auth.api';
import LoginForm from '@/components/forms/login';
import GoogleLink from '@/components/links/oauth2/google';
import { LoginFormValues } from '@/lib/types/login';
import { setUser } from '@/lib/store/userStore';
import { selectUser } from '@/lib/store/selectors';
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
      const { data } = await login(values);
      dispatch(setUser(data));
    } catch (error: any) {
      let errMessage = '';
      if (error instanceof AxiosError)
        errMessage = error.response?.data.message;
      else {
        errMessage = error.message ?? 'Error!';
      }
      toast.error(errMessage);
    }
  };

  return (
    <>
      {!user && (
        <div className="max-w-lg mx-auto mt-32 p-6 bg-white rounded shadow">
          <h1 className="text-2xl font-bold mb-6 text-indigo-600">Login</h1>
          <LoginForm
            onSubmit={onSubmit}
            initialValues={initialValues}
          />
          <p className="text-sm text-gray-900 mt-2">
            Don&apos;t have an account.{' '}
            <Link
              className="text-green-500 hover:underline"
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

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default Login;
