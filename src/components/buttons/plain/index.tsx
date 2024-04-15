interface Props {
  label: string;
  onClick: () => void | Promise<void>;
  additionalStyle?: string;
}

const PlainButton: React.FC<Props> = ({
  label,
  onClick = () => {},
  additionalStyle = '',
}) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={`flex items-center gap-1 text-white font-bold bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-sm text-sm transition-colors duration-300 ease-in-out ${additionalStyle}`}
    >
      {label}
    </button>
  );
};
export default PlainButton;
