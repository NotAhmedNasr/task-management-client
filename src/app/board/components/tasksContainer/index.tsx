'use client';

import { Task, TaskStatus } from '@/lib/types/task';
import VerticalSection from '../verticalSection';
import _groupBy from 'lodash/groupBy';

interface Props {
  tasks: Task[];
}

const TasksContainer: React.FC<Props> = ({ tasks }) => {
  const tasksByStatus = _groupBy(tasks, 'status');

  return (
    <section className="flex flex-row gap-10 justify-between overflow-auto mx-20 mt-20 bg-gray-400 dark:bg-gray-800 p-10">
      <VerticalSection
        title="To Do"
        tasks={([] as Task[]).concat(
          tasksByStatus[TaskStatus.TODO] ?? [],
          tasksByStatus[TaskStatus.POSTPONED] ?? [],
        )}
      />
      <VerticalSection
        title="In Progress"
        tasks={tasksByStatus[TaskStatus.IN_PROGRESS] ?? []}
      />
      <VerticalSection
        title="Finished"
        tasks={tasksByStatus[TaskStatus.FINISHED] ?? []}
      />
    </section>
  );
};

export default TasksContainer;
