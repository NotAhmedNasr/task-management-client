import { NavItemData } from '@/lib/types/navigation';
import NavLink from '../../link';

interface Props {
  links: NavItemData[];
}

const VMenu: React.FC<Props> = ({ links }) => {
  return (
    <div className="flex flex-col space-y-2 justify-center">
      {links.map((link) => (
        <NavLink link={link} key={link.text} />
        ))}
    </div>
  );
};

export default VMenu;
