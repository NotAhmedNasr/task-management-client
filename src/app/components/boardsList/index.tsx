'use client';

import { Board } from '@/lib/types/board';
import BoardCard from '../boardCard';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { selectToken } from '@/lib/store/user/selectors';
import { getUserBoards } from '@/lib/services/board.api';

const BoardsList: React.FC = () => {
  const token = useAppSelector(selectToken);
  const [boards, setBoards] = useState<Board[]>([]);

  const getBoards = async () => {
    if (!token) return;
    const { err, result } = await getUserBoards(token);
    if (err) return console.error(err);
    setBoards(result.data.data);
  };

  useEffect(() => {
    getBoards();
  }, [token]);

  return (
    token && (
      <section className="self-stretch bg-gray-900 p-10 rounded-lg overflow-x-auto">
        <h1 className="text-2xl font-semibold text-left mb-10">
          Available Boards
        </h1>
        <div className="flex gap-5 justify-start">
          {boards.map((board) => (
            <BoardCard board={board} key={board.id} />
          ))}
        </div>
      </section>
    )
  );
};

export default BoardsList;
