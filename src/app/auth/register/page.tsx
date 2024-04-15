'use client';
import React from 'react';
import _omit from 'lodash/omit';
import { toast } from 'react-toastify';
import { RegisterFormValues } from '../../../lib/types/registration';
import { register } from '../../../lib/services/auth.api';
import { AxiosError } from 'axios';
import GoogleLink from '@/components/links/oauth2/google';
import { useAppSelector } from '@/lib/store/hooks';
import RegistrationForm from '@/components/forms/register';
import { selectUser } from '@/lib/store/user/selectors';
import Link from 'next/link';

const Register: React.FC = () => {
  const user = useAppSelector(selectUser);
  if (user) {
    location.href = '/';
  }

  const initialValues: RegisterFormValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  };

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await register(_omit(values, 'confirmPassword'));
      location.href = location.pathname + '/success';
    } catch (error: unknown) {
      let errMessage = '';
      if (error instanceof AxiosError)
        errMessage = error.response?.data.message;
      else if (error instanceof Error) {
        errMessage = error.message ?? 'Error!';
      }
      toast.error(errMessage);
    }
  };

  const validate = (values: RegisterFormValues) => {
    const errors: Partial<RegisterFormValues> = {};
    if (values.confirmPassword && values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Must match Password';
    }
    return errors;
  };

  return (
    <>
      {!user && (
        <div className="max-w-lg mx-auto mt-32 p-6 bg-white rounded shadow">
          <h1 className="text-2xl font-bold mb-6 text-gray-600">
            Registration
          </h1>
          <RegistrationForm
            onSubmit={onSubmit}
            validate={validate}
            initialValues={initialValues}
          />
          <p className="text-sm text-gray-900 mt-2">
            Already have an account.{' '}
            <Link
              className="text-blue-500 hover:underline"
              href={'/auth/login'}
            >
              Login
            </Link>{' '}
            instead!
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

export default Register;
