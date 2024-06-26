import { GetManyResponseType } from '../types/api';
import { Task, TaskStatus } from '../types/task';
import { promiseToErrResult } from '../utils/promiseToErrResult';
import axiosInstance from './axios/instance';

interface GetTasksParams {
  page?: number;
  pageSize?: number;
  filter?: {
    title?: string;
    description?: string;
    status?: string;
    dueAtFrom?: string;
    dueAtTo?: string;
    boardId?: string;
  };
}

export const getTasks = (boardId: string, token: string) => {
  const params: GetTasksParams = {
    page: 1,
    pageSize: 25,
    filter: {
      boardId,
    },
  };
  const promise = axiosInstance.get<GetManyResponseType<Task>>('/tasks', {
    params: { ...params, filter: JSON.stringify(params.filter) },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return promiseToErrResult(promise);
};

export type CreateTaskData = Pick<
  Task,
  'title' | 'description' | 'boardId' | 'dueAt'
>;

export const createTask = (data: CreateTaskData, token: string) => {
  const promise = axiosInstance.post('/tasks', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promiseToErrResult(promise);
};

export type EditTaskData = Pick<Task, 'title' | 'description' | 'dueAt'>;

export const editTask = (id: Task['id'], data: EditTaskData, token: string) => {
  const promise = axiosInstance.patch(`/tasks/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promiseToErrResult(promise);
};

export const changeTaskStatus = (
  id: Task['id'],
  status: TaskStatus,
  token: string,
) => {
  const promise = axiosInstance.patch(
    `/tasks/${id}`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return promiseToErrResult(promise);
};
