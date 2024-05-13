'use client';

import { useAppSelector } from '@/lib/store/hooks';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/views/loadingScreen';
import { selectToken } from '@/lib/store/user/selectors';
import { getBoardById } from '@/lib/services/board.api';
import { getTasks } from '@/lib/services/task.api';
import { Board } from '@/lib/types/board';
import { Task } from '@/lib/types/task';
import TasksContainer from '../components/tasksContainer';
interface PageProps {
  params: {
    boardId: string;
  };
  searchParams: Record<string, string>;
}
const BoardPage = ({ params: { boardId } }: PageProps) => {
  const token = useAppSelector(selectToken);
  const [board, setBoard] = useState<Board>();
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasksData = async () => {
    const { err, result } = await getTasks(boardId, token ?? '');
    if (err) {
      return console.error(err);
    }
    setTasks(result.data.data);
  };

  const getBoardData = async () => {
    const { err, result } = await getBoardById(boardId, token ?? '');
    if (err) {
      return console.error(err);
    }
    setBoard(result.data);
    await getTasksData();
  };

  useEffect(() => {
    getBoardData();
  }, []);

  return !board ? (
    <LoadingScreen />
  ) : (
    <section>
      <TasksContainer tasks={tasks} />
    </section>
  );
};

export default BoardPage;
