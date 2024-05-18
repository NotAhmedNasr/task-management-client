'use client';
import { FiX } from 'react-icons/fi';

interface Props {
  onClick: () => void;
  size: number;
  disabled?: boolean;
}

const XButton: React.FC<Props> = ({ onClick, size, disabled = false }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className="text-gray-400 hover:text-white focus:outline-none focus:text-white disabled:hover:text-gray-500 disabled:text-gray-500"
      onClick={() => onClick()}
    >
      <FiX size={size} />
    </button>
  );
};

export default XButton;
