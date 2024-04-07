'use client';

import { useEffect } from 'react';
import { getUser } from '@/lib/services/user.api';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { selectToken } from '@/lib/store/user/selectors';
import { setUser } from '@/lib/store/user/actions';

// Loading data that app depends on to function correctly
const AppDataLoader = () => {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) {
      getUser({ token }).then(({ data }) => dispatch(setUser(data)));
    }
  }, [token, dispatch]);
  return <></>;
};

export default AppDataLoader;
