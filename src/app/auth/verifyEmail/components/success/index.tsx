'use client';
import { FiCheckCircle } from 'react-icons/fi';
import AlertMessage from '../../../../../components/views/alertMessage';

const EmailVerificationSuccess = () => {
  return (
    <AlertMessage
      title="Email Verified"
      icon={<FiCheckCircle className="text-green-500" />}
      message={'Your Email was verified successfully.'}
      action={{
        name: 'Login',
        handler: () => (location.href = '/auth/login'),
      }}
    />
  );
};

export default EmailVerificationSuccess;
