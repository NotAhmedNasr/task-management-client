import { NavItemData } from '@/lib/types/navigation';
import NavLink from '../../link';

interface Props {
  links: NavItemData[];
}

const HMenu: React.FC<Props> = ({ links }) => {
  return (
    <div className="flex space-x-4">
      {links.map((link) => (
        <NavLink link={link} key={link.text} />
      ))}
    </div>
  );
};

export default HMenu;
