import { NavItemData, isNavLink } from '@/lib/types/navigation';
import Link from 'next/link';

interface Props {
  link: NavItemData;
}

const NavLink: React.FC<Props> = ({ link }) => {
  if (isNavLink(link)) {
    return (
      <Link
        className="flex gap-1 items-center text-white hover:bg-gray-700 px-3 py-2 sm:rounded-md text-sm font-medium transition-colors duration-300 ease-in-out"
        href={link.href}
      >
        {link.icon ?? null}
        <span>{link.text}</span>
      </Link>
    );
  } else {
    return (
      <button
        onClick={() => link.onClick()}
        className="flex gap-0 items-center text-white hover:bg-gray-700 px-3 py-2 sm:rounded-md text-sm font-medium transition-colors duration-300 ease-in-out"
      >
        {link.icon ?? null}
        <span>{link.text}</span>
      </button>
    );
  }
};

export default NavLink;
