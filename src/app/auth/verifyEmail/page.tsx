'use client';

import { verifyEmail } from '@/lib/services/auth.api';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/views/loadingScreen';
import EmailVerificationSuccess from './components/success';
import EmailVerificationFailure from './components/failure';
import { AxiosError } from 'axios';
interface PageProps {
  searchParams: Record<string, string>;
}
const VerifyEmail = ({ searchParams }: PageProps) => {
  const [result, setResult] = useState<{
    success: boolean;
    error: string | null;
  }>({ success: false, error: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyEmail(searchParams.token)
      .then(() => {
        setResult({ success: true, error: null });
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          setResult({ success: false, error: error.response?.data?.message });
        } else {
          setResult({ success: false, error: error.message });
        }
      })
      .finally(() => setLoading(false));
  }, [searchParams]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : result.success ? (
        <EmailVerificationSuccess />
      ) : (
        <EmailVerificationFailure message={result.error ?? ''} />
      )}
    </>
  );
};

export default VerifyEmail;
