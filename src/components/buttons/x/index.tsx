'use client';
import { FiX } from 'react-icons/fi';

interface Props {
  onClick: () => void;
  size: number;
}

const XButton: React.FC<Props> = ({ onClick, size }) => {
  return (
    <button
      type="button"
      className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
      onClick={() => onClick()}
    >
      <FiX size={size} />
    </button>
  );
};

export default XButton;
