'use client';

import { Task, TaskStatus } from '@/lib/types/task';
import TaskCard from '../taskCard';
import { useDrop } from 'react-dnd';
import { DraggableItemTypes } from '@/lib/types/Dnd';

interface Props {
  title: string;
  toStatus: TaskStatus;
  onChangeTaskStatus: (
    id: Task['id'],
    status: TaskStatus,
  ) => void | Promise<void>;
  tasks: Task[];
}

const VerticalSection: React.FC<Props> = ({
  title,
  tasks,
  onChangeTaskStatus,
  toStatus,
}) => {
  const isOwnTask = (task: Task) =>
    tasks.findIndex((ownTask) => ownTask.id === task.id) !== -1;
  const [{ isOver, draggedTask }, drop] = useDrop(
    () => ({
      accept: DraggableItemTypes.TASK,
      drop: (item: Task) => {
        if (isOwnTask(item)) return;
        onChangeTaskStatus(item.id, toStatus);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        draggedTask: monitor.getItem<Task>(),
      }),
    }),
    [tasks],
  );
  return (
    <div
      className={`grow max-w-96 min-w-72 min-h-96 px-5 py-5 border bg-gray-400 dark:bg-gray-700 transition duration-200 rounded-md ${isOver && !isOwnTask(draggedTask) ? 'border-cyan-700' : 'border-gray-400 dark:border-gray-700'}`}
      ref={drop}
    >
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
