'use client';

import { useAppDispatch } from '@/lib/store/hooks';
import { setUser } from '@/lib/store/userStore';
import { googleLogin } from '@/lib/services/auth.api';
import _debounce from 'lodash/debounce';
import { useEffect } from 'react';
import LoadingScreen from '@/components/auth/views/loadingScreen';
interface PageProps {
  params: {
    provider: string;
  };
  searchParams: Record<string, string>;
}
const OauthProviderRedirect = ({ params, searchParams }: PageProps) => {
  const dispatch = useAppDispatch();
  const login = _debounce((params) => googleLogin(params), 5000, {
    leading: true,
  });
  useEffect(() => {
    login(searchParams)
      .then(({ data }) => {
        dispatch(setUser(data));
        location.href = '/';
      })
      .catch(console.error);
  }, [searchParams]);

  return <LoadingScreen />;
};

export default OauthProviderRedirect;
