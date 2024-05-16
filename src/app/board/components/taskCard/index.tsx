import { Task, TaskStatus } from '@/lib/types/task';
import Badge, { BadgeColor } from '../badge';

interface Props {
  task: Task;
}

const taskStatusPalette: Record<TaskStatus, BadgeColor> = {
  [TaskStatus.TODO]: 'white',
  [TaskStatus.POSTPONED]: 'yellow',
  [TaskStatus.IN_PROGRESS]: 'blue',
  [TaskStatus.FINISHED]: 'green',
};

const TaskCard: React.FC<Props> = ({ task }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 hover:cursor-pointer transition duration-200 hover:scale-105 rounded-sm rounded-tl-xl rounded-br-xl drop-shadow-lg p-5 min-h-44 flex flex-col justify-between gap-5">
      <div className="flex justify-between">
        <h3 className="text-md text-gray-700 dark:text-gray-50 font-semibold">
          {task.title}
        </h3>
        <Badge color={taskStatusPalette[task.status]} text={task.status} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300 grow">
        {task.description}
      </p>
      <small className="opacity-50 text-xs">
        Due: {new Date(task.dueAt).toLocaleString()}
      </small>
    </div>
  );
};

export default TaskCard;
