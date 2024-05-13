import { Board } from '@/lib/types/board';

interface Props {
  board: Board;
}

const BoardCard: React.FC<Props> = ({ board }) => {
  return (
    <div
      onClick={() => (location.href = `/board/${board.id}`)}
      className="flex flex-col justify-between p-5 dark:bg-gray-800 hover:cursor-pointer min-h-40 rounded-md border border-teal-900 hover:drop-shadow-xl min-w-72"
    >
      <h1 className="text-lg">{board.name}</h1>
      <small className="text-sm">
        Created: {new Date(board.createdAt).toLocaleString()}
      </small>
      {board.personal && <div className="text-xs text-end">Personal</div>}
    </div>
  );
};

export default BoardCard;
