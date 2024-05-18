'use client';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/views/loadingScreen';
import { selectToken } from '@/lib/store/user/selectors';
import { getBoardById } from '@/lib/services/board.api';
import {
  CreateTaskData,
  EditTaskData,
  createTask,
  editTask,
  changeTaskStatus,
  getTasks,
} from '@/lib/services/task.api';
import { Board } from '@/lib/types/board';
import { Task, TaskStatus } from '@/lib/types/task';
import TasksContainer from '../components/tasksContainer';
import TaskForm from '../components/taskForm';
import PlainButton from '@/components/buttons/plain';
import { FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { selectIsTaskFormOpen } from '@/lib/store/task/selectors';
import { openTaskForm } from '@/lib/store/task/actions';
import { openAlertDialog } from '@/components/dialog/alert';
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
  const isTaskFormOpen = useAppSelector(selectIsTaskFormOpen);
  const dispatch = useAppDispatch();

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

  const onEditTask = async (id: Task['id'], data: EditTaskData) => {
    const { err } = await editTask(id, data, token ?? '');

    if (err) {
      toast.error(err.message);
      return false;
    }
    toast.info('Task was edited successfully');
    getTasksData();
    return true;
  };

  const onChangeTaskStatus = async (id: Task['id'], status: TaskStatus) => {
    openAlertDialog({
      title: 'Are you sure?',
      body: `The task status will be changed to ${status}`,
      onAccept: async () => {
        const { err } = await changeTaskStatus(id, status, token ?? '');
        if (err) {
          toast.error(err.message);
        }
        toast.info('Task was edited successfully');
        getTasksData();
      },
    });
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
            dispatch(openTaskForm());
          }}
        >
          <div className="flex gap-2 items-center">
            <FiEdit size={16} />
            <div>New</div>
          </div>
        </PlainButton>
      </div>
      <TasksContainer onChangeTaskStatus={onChangeTaskStatus} tasks={tasks} />
      <TaskForm
        onSubmit={(data, id) => {
          if (id) {
            return onEditTask(id, data);
          }
          return onCreateTask({ ...data, boardId });
        }}
        isOpen={isTaskFormOpen}
      />
    </section>
  );
};

export default BoardPage;
