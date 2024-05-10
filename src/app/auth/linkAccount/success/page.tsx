'use client';
import AlertMessage from '@/components/views/alertMessage';
import { FiCheckCircle } from 'react-icons/fi';

const RegistrationSuccess = () => {
  return (
    <AlertMessage
      title="Account Linked Successfully"
      icon={<FiCheckCircle className="text-green-500" />}
      message={'You can now login to your account using the new credentials.'}
      action={{
        name: 'Login',
        handler: () => (location.href = '/auth/login'),
      }}
    />
  );
};

export default RegistrationSuccess;
