'use client';
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/store/hooks';
import { getUser } from '@/lib/store/selectors';
import { removeUser } from '@/lib/store/userStore';
import Link from 'next/link';

const HomeAuthLinks = () => {
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  return (
    <>
      {user ? (
        <button
          type="button"
          onClick={() => dispatch(removeUser())}
          className="bg-red-950 hover:bg-red-900 text-white py-2 px-4 rounded-sm transition-colors duration-150"
        >
          Logout
        </button>
      ) : (
        <div className="flex space-x-4">
          <Link
            href="/auth/login"
            className="bg-blue-950 hover:bg-blue-900 rounded-sm text-white py-2 px-4 transition-colors duration-150"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="bg-green-950 hover:bg-green-900 text-white py-2 px-4 rounded-sm transition-colors duration-150"
          >
            Register
          </Link>
        </div>
      )}
    </>
  );
};

export default HomeAuthLinks;
