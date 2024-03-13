'use client';

import NavLink from '../link';
import BurgerButton from '../../buttons/burger';
import HMenu from '../menu/horizontal';
import VMenu from '../menu/vertical';
import MobileMenu from '../menu/mobile';
import { useState } from 'react';
import { NavItemData } from '@/lib/types/navigation';
import HomeAuthLinks from '@/components/links/authLinks';
import { FiHome } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const links: NavItemData[] = [
    // {
    //   href: '/tasks',
    //   text: 'Tasks',
    // },
    // {
    //   href: '/me',
    //   text: 'Profile',
    // },
  ];

  return (
    <nav className="dark:bg-gray-800 shadow-lg fixed top-0 right-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink
              link={{
                text: 'Task Management',
                icon: <FiHome className='text-xl' />,
                href: '/',
              }}
            />
          </div>

          {/* Menu */}
          <div className="hidden sm:flex sm:gap-20">
            <HMenu links={links} />
            <HomeAuthLinks />
          </div>

          {/* Mobile Menu Button (hidden on larger screens) */}
          <div className="-mr-2 flex sm:hidden">
            <BurgerButton onClick={() => setIsMobileMenuOpen(true)} />
          </div>
        </div>
      </div>

      {/* Mobile Menu (hidden on larger screens) */}
      <div className="sm:hidden" id="mobile-menu">
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => {
            setIsMobileMenuOpen(false);
          }}
        >
          <VMenu links={links} />
          <div className="flex justify-center absolute bottom-10 left-0 right-0">
            <HomeAuthLinks />
          </div>
        </MobileMenu>
      </div>
    </nav>
  );
};

export default Navbar;
