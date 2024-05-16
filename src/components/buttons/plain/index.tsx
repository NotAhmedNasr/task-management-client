import { PropsWithChildren } from 'react';

interface Props {
  onClick: () => void | Promise<void>;
  disabled?: boolean;
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'default';
  additionalStyle?: string;
}

const colorPalette = {
  default: 'bg-gray-800 hover:bg-gray-700',
  yellow: 'bg-yellow-800 hover:bg-yellow-700',
  blue: 'bg-blue-800 hover:bg-blue-700',
  green: 'bg-green-800 hover:bg-green-700',
  red: 'bg-red-800 hover:bg-red-700',
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
