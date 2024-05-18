export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  POSTPONED = 'postponed',
  FINISHED = 'finished',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueAt: string;
  createdById: number;
  assigneeId: number;
  boardId: string;
  createdAt: string;
  updatedAt: string;
}
