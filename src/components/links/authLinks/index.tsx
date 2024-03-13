'use client';
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/store/hooks';
import { selectUser } from '@/lib/store/selectors';
import { removeUser } from '@/lib/store/userStore';
import Link from 'next/link';
import { FiFeather, FiLogIn, FiLogOut } from 'react-icons/fi';

const HomeAuthLinks = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  return (
    <>
      {user ? (
        <button
          type="button"
          onClick={() => dispatch(removeUser())}
          className="flex items-center gap-1 text-white font-bold hover:bg-gray-700 px-3 py-2 sm:rounded-md text-sm transition-colors duration-300 ease-in-out"
        >
          Logout
          <FiLogOut className='text-lg'/>
        </button>
      ) : (
        <div className="flex space-x-4">
          <Link
            href="/auth/login"
            className="flex items-center gap-1 justify-between text-white font-bold hover:bg-gray-700 px-3 py-2 sm:rounded-md text-sm transition-colors duration-300 ease-in-out"
          >
            Login
            <FiLogIn className='text-lg' />
          </Link>
          <Link
            href="/auth/register"
            className="flex items-center gap-1 text-white font-bold hover:bg-gray-700 px-3 py-2 sm:rounded-md text-sm transition-colors duration-300 ease-in-out"
          >
            Register
            <FiFeather className='text-lg'/>
          </Link>
        </div>
      )}
    </>
  );
};

export default HomeAuthLinks;
