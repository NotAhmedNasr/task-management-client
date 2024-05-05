'use client';

import { useEffect } from 'react';
import { getUser } from '@/lib/services/user.api';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { selectToken } from '@/lib/store/user/selectors';
import { removeUser, setUser } from '@/lib/store/user/actions';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

// Loading data that app depends on to function correctly
const AppDataLoader = () => {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) {
      getUser({ token }).then(({ err, result: user }) => {
        if (!err) {
          dispatch(setUser(user));
        }
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            dispatch(removeUser());
          } else {
            toast.error('Something went wrong');
          }
        }
      });
    }
  }, [token, dispatch]);
  return <></>;
};

export default AppDataLoader;
