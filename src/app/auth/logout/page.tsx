'use client';

import LoadingScreen from '@/components/views/loadingScreen';
import { useAppDispatch } from '@/lib/store/hooks';
import { removeUser } from '@/lib/store/user/actions';
import { useEffect } from 'react';

const Logout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(removeUser());
    location.href = 'login';
  }, [dispatch]);

  return <LoadingScreen />;
};

export default Logout;
