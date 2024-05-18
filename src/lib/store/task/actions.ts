import { getActionTypes } from '../types';
import { taskSlice, taskSliceName } from './slice';

export const { editTask, editTaskFinished, closeTaskForm, openTaskForm } =
  taskSlice.actions;
export const taskActionTypes = getActionTypes(taskSliceName, taskSlice.actions);
