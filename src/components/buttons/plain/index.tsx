import { PropsWithChildren } from 'react';

interface Props {
  onClick: () => void | Promise<void>;
  disabled?: boolean;
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'default';
  additionalStyle?: string;
}

const colorPalette = {
  default:
    'text-white bg-gray-800 hover:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-900 disabled:hover:bg-gray-900',
  yellow:
    'text-white bg-yellow-800 hover:bg-yellow-700 disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-yellow-900 disabled:hover:bg-yellow-900',
  blue: 'text-white bg-blue-800 hover:bg-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-blue-900 disabled:hover:bg-blue-900',
  green:
    'text-white bg-green-800 hover:bg-green-700 disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-green-900 disabled:hover:bg-green-900',
  red: 'text-white bg-red-800 hover:bg-red-700 disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-red-900 disabled:hover:bg-red-900',
};

const PlainButton: React.FC<PropsWithChildren<Props>> = ({
  onClick = () => {},
  additionalStyle = '',
  color = 'default',
  disabled = false,
  children,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={() => {
        onClick();
      }}
      className={`flex items-center gap-1 text-white font-bold ${colorPalette[color]} px-3 py-2 rounded-sm text-sm transition-colors duration-300 ease-in-out ${additionalStyle}`}
    >
      {children}
    </button>
  );
};
export default PlainButton;
