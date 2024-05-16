'use client';

import { useAppSelector } from '@/lib/store/hooks';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/views/loadingScreen';
import { selectToken } from '@/lib/store/user/selectors';
import { getBoardById } from '@/lib/services/board.api';
import { CreateTaskData, createTask, getTasks } from '@/lib/services/task.api';
import { Board } from '@/lib/types/board';
import { Task } from '@/lib/types/task';
import TasksContainer from '../components/tasksContainer';
import TaskForm from '../components/taskForm';
import PlainButton from '@/components/buttons/plain';
import { FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';
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
  const [taskFormOpen, setTaskFormOpen] = useState(false);

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

  const onCreateTask = async (data: CreateTaskData) => {
    const { err } = await createTask(data, token ?? '');

    if (err) {
      toast.error(err.message);
      return false;
    }
    toast.info('Task was created successfully');
    getTasksData();
    return true;
  };

  useEffect(() => {
    getBoardData();
  }, []);

  return !board ? (
    <LoadingScreen />
  ) : (
    <section className="m-5 md:m-20">
      <div className="flex gap-10 mb-10">
        <h1 className="text-2xl md:text-4xl">{board.name}</h1>
        <PlainButton
          color="blue"
          onClick={() => {
            setTaskFormOpen(true);
          }}
        >
          <div className="flex gap-2 items-center">
            <FiEdit size={16} />
            <div>New</div>
          </div>
        </PlainButton>
      </div>
      <TasksContainer tasks={tasks} />
      <TaskForm
        onClose={() => {
          setTaskFormOpen(false);
        }}
        onSubmit={(data) => onCreateTask({ ...data, boardId })}
        isOpen={taskFormOpen}
      />
    </section>
  );
};

export default BoardPage;
