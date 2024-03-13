'use client';
import { BiLogoGoogle } from 'react-icons/bi';

const GoogleLink = () => {
  return (
    <div className="flex items-center">
      <a
        href={`${process.env.BACKEND_URL}/oauth2/google`}
        target="_self"
        className="m-auto"
      >
        <BiLogoGoogle className="w-20 h-20 border text-gray-700 border-white hover:border-gray-200 hover:bg-gray-100 hover:cursor-pointer rounded-md duration-150" />
      </a>
    </div>
  );
};

export default GoogleLink;
