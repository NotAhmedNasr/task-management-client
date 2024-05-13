export type BadgeColor = 'green' | 'blue' | 'yellow' | 'white' | 'red';

interface Props {
  color: BadgeColor;
  text: string;
  icon?: React.ReactNode;
}

const colorPalette = {
  white: 'bg-gray-600',
  yellow: 'bg-yellow-600',
  blue: 'bg-blue-900',
  green: 'bg-green-900',
  red: 'bg-red-900',
};

const Badge: React.FC<Props> = ({ color, text, icon }) => {
  return (
    <div
      className={`flex items-center min-w-16 text-xs p-2 rounded-full ${colorPalette[color]}`}
    >
      {icon && <div>{icon || null}</div>}
      <div className="items-center text-center m-auto">{text}</div>
    </div>
  );
};

export default Badge;
