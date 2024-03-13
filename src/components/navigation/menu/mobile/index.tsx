import XButton from '@/components/buttons/x';
import { PropsWithChildren } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<PropsWithChildren<Props>> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <div
      className={`${
        !isOpen ? 'translate-x-full' : 'translate-x-0'
      } sm:hidden gap-10 fixed inset-y-0 right-0 z-50 w-1/2 bg-gray-900 shadow-lg overflow-y-auto ease-in-out transition-all duration-300 transform`}
    >
      <div className="flex items-center justify-end h-16 px-4 sm:px-6 lg:px-8">
        <XButton onClick={onClose} size={20} />
      </div>
      <div className='grow'></div>
      {children}
    </div>
  );
};

export default MobileMenu;
