import React, { PropsWithChildren } from 'react';

const ContentSection: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grow bg-gray-900 shadow-lg rounded-lg p-5 overflow-auto">
      {children}
    </div>
  );
};

export default ContentSection;
