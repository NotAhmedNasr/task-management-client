'use client';
import AlertMessage from '@/components/views/alertMessage';
import { FiCheckCircle } from 'react-icons/fi';

const EmailVerificationRequired = () => {
  return (
    <AlertMessage
      title="Email Verification Required"
      icon={<FiCheckCircle className="text-green-500" />}
      message={'We are waiting for you to verify your email address.'}
      note={
        'Please check your inbox and follow the instructions in the email to complete the verification process.'
      }
    />
  );
};

export default EmailVerificationRequired;
