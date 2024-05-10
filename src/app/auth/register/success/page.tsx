'use client';
import AlertMessage from '@/components/views/alertMessage';
import { FiCheckCircle } from 'react-icons/fi';

const RegistrationSuccess = () => {
  return (
    <AlertMessage
      title="Registration Successful"
      icon={<FiCheckCircle className="text-green-500" />}
      message={
        'Your registration was successful. You can now login to your account'
      }
      action={{
        name: 'Login',
        handler: () => (location.href = '/auth/login'),
      }}
    />
  );
};

export default RegistrationSuccess;
