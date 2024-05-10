'use client';

import RegistrationForm from '@/components/forms/register';
import { RegisterFormValues } from '@/lib/types/registration';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import _omit from 'lodash/omit';
import { linkAccount } from '@/lib/services/auth.api';

interface PageProps {
  searchParams: {
    token: string;
    email: string;
  };
}

const LinkAccount = ({ searchParams }: PageProps) => {
  const initialValues: Omit<RegisterFormValues, 'firstName' | 'lastName'> = {
    username: '',
    email: searchParams.email,
    password: '',
    confirmPassword: '',
  };

  const onSubmit = async (values: RegisterFormValues) => {
    const { err } = await linkAccount(
      searchParams.token,
      _omit(values, ['confirmPassword', 'email']),
    );
    if (err) {
      let errMessage = '';
      if (err instanceof AxiosError) {
        errMessage = err.response?.data.message?.toString();
      } else if (err instanceof Error) {
        errMessage = err.message ?? 'Error!';
      }
      toast.error(errMessage);
    } else {
      location.href = location.pathname + '/success';
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
    <div className="max-w-lg mx-auto mt-32 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-600">Link Account</h1>
      <RegistrationForm
        onSubmit={onSubmit}
        validate={validate}
        initialValues={initialValues}
        disabledFields={['email']}
        loginFieldsOnly
      />
    </div>
  );
};

export default LinkAccount;
