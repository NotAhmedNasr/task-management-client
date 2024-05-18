'use client';

import _groupBy from 'lodash/groupBy';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Task, TaskStatus } from '@/lib/types/task';
import VerticalSection from '../verticalSection';

interface Props {
  tasks: Task[];
  onChangeTaskStatus: (
    id: Task['id'],
    status: TaskStatus,
  ) => void | Promise<void>;
}

const TasksContainer: React.FC<Props> = ({ tasks, onChangeTaskStatus }) => {
  const tasksByStatus = _groupBy(tasks, 'status');

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="flex flex-row gap-10 justify-between overflow-auto bg-gray-400 dark:bg-gray-800 p-10">
        <VerticalSection
          title="To Do"
          toStatus={TaskStatus.POSTPONED}
          onChangeTaskStatus={onChangeTaskStatus}
          tasks={([] as Task[]).concat(
            tasksByStatus[TaskStatus.TODO] ?? [],
            tasksByStatus[TaskStatus.POSTPONED] ?? [],
          )}
        />
        <VerticalSection
          title="In Progress"
          onChangeTaskStatus={onChangeTaskStatus}
          toStatus={TaskStatus.IN_PROGRESS}
          tasks={tasksByStatus[TaskStatus.IN_PROGRESS] ?? []}
        />
        <VerticalSection
          title="Finished"
          onChangeTaskStatus={onChangeTaskStatus}
          toStatus={TaskStatus.FINISHED}
          tasks={tasksByStatus[TaskStatus.FINISHED] ?? []}
        />
      </section>
    </DndProvider>
  );
};

export default TasksContainer;
