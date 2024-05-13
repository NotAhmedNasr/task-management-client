'use client';

import { Task } from '@/lib/types/task';
import TaskCard from '../taskCard';

interface Props {
  title: string;
  tasks: Task[];
}

const VerticalSection: React.FC<Props> = ({ title, tasks }) => {
  return (
    <div className="grow max-w-96 min-w-72 px-5 py-5 bg-gray-400 dark:bg-white dark:bg-opacity-10 rounded-md">
      <h1 className="text-center text-lg font-bold mb-5">{title}</h1>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};

export default VerticalSection;
