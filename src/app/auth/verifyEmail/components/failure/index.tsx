'use client';
import { FiXCircle } from 'react-icons/fi';
import AlertMessage from '../../../../../components/views/alertMessage';

interface Props {
  message: string;
}

const EmailVerificationFailure: React.FC<Props> = ({ message }) => {
  return (
    <AlertMessage
      title="Email Verification Failed"
      icon={<FiXCircle className="text-red-500" />}
      message={message}
      action={{
        name: 'Go to Login',
        handler: () => (location.href = '/auth/login'),
      }}
    />
  );
};

export default EmailVerificationFailure;
