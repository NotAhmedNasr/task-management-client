import { Task, TaskStatus } from '@/lib/types/task';
import Badge, { BadgeColor } from '../badge';
import { useAppDispatch } from '@/lib/store/hooks';
import { editTask } from '@/lib/store/task/actions';
import { useDrag } from 'react-dnd';
import { DraggableItemTypes } from '@/lib/types/Dnd';

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
  const dispatch = useAppDispatch();
  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: DraggableItemTypes.TASK,
      collect: (monitor) => {
        return { isDragging: !!monitor.isDragging() };
      },
      item: task,
    };
  });

  const trimExtraText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };
  const onClick = () => {
    dispatch(editTask(task));
  };
  return (
    <div
      ref={drag}
      onClick={() => onClick()}
      className={`bg-gray-100 dark:bg-gray-900 hover:cursor-pointer transition duration-200 hover:scale-105 rounded-sm rounded-tl-xl rounded-br-xl drop-shadow-lg p-5 min-h-44 flex flex-col justify-between gap-5 ${isDragging ? 'animate-pulse' : ''}`}
    >
      <div className="flex justify-between">
        <h3
          className="text-md text-gray-700 dark:text-gray-50 font-semibold"
          title={task.title}
        >
          {trimExtraText(task.title, 15)}
        </h3>
        <Badge color={taskStatusPalette[task.status]} text={task.status} />
      </div>
      <p
        className="text-sm text-gray-500 dark:text-gray-300 grow text-wrap break-all"
        title={task.description}
      >
        {trimExtraText(task.description, 150)}
      </p>
      <small className="opacity-50 text-xs">
        Created: {new Date(task.createdAt).toLocaleString()}
        <br />
        <br />
        Due: {new Date(task.dueAt).toLocaleString()}
      </small>
    </div>
  );
};

export default TaskCard;
