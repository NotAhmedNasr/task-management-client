'use client';
import { FcGoogle } from 'react-icons/fc';

const GoogleLink = () => {
  return (
    <div className="flex items-center">
      <a
        href={`${process.env.BACKEND_URL}/oauth2/google`}
        target="_blank"
        className="m-auto"
      >
        <FcGoogle className="w-20 h-20 border border-white hover:border-gray-200 hover:bg-gray-50 hover:cursor-pointer rounded-md duration-150" />
      </a>
    </div>
  );
};

export default GoogleLink;
