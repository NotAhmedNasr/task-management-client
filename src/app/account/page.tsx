'use client';

import { useAppSelector } from '@/lib/store/hooks';
import MainSection from './components/mainSection';
import { selectUser } from '@/lib/store/user/selectors';

const AccountPage = () => {
  const user = useAppSelector(selectUser);
  if (!user) location.href = '/auth/login';
  return (
    <>
      {user && (
        <div>
          <h1 className="text-7xl text-center p-5">Account Page</h1>
          <MainSection />
        </div>
      )}
    </>
  );
};

export default AccountPage;
