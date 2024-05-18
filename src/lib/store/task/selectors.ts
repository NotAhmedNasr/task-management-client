import { AppRootState } from '../types';

export const selectEditedTask = (state: AppRootState) => state.task.editedTask;
export const selectIsTaskFormOpen = (state: AppRootState) =>
  state.task.isTaskFormOpen;
