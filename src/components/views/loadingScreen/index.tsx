import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center fixed top-0 left-0 h-full w-full z-50 bg-black">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
      <p className="text-gray-300 text-4xl animate-pulse">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
