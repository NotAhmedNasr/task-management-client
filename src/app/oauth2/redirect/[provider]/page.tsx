'use client';

import { useAppDispatch } from '@/lib/store/hooks';
import { setToken, setUser } from '@/lib/store/user/actions';
import { googleLogin } from '@/lib/services/auth.api';
import { useEffect } from 'react';
import LoadingScreen from '@/components/views/loadingScreen';
interface PageProps {
  params: {
    provider: string;
  };
  searchParams: Record<string, string>;
}
const OauthProviderRedirect = ({ searchParams }: PageProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    googleLogin(searchParams)
      .then(({ data }) => {
        dispatch(setToken(data.token));
        dispatch(setUser(data.user));
        location.href = '/';
      })
      .catch(console.error);
  }, [searchParams, dispatch]);

  return <LoadingScreen />;
};

export default OauthProviderRedirect;
