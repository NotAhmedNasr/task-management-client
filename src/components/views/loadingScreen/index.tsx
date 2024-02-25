import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-5">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
      <p className="text-gray-300 text-4xl animate-pulse">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
