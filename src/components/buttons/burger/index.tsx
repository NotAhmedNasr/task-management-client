import { FiMenu } from 'react-icons/fi';

interface Props {
  onClick: () => void;
}

const BurgerButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
      onClick={() => onClick()}
    >
      <FiMenu size={20} />
    </button>
  );
};

export default BurgerButton;
