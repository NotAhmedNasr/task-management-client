import { Task } from '@/lib/types/task';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const taskSliceName = 'task';

interface TaskState {
  editedTask: Task | null;
  isTaskFormOpen: boolean;
}

const initialState: TaskState = {
  editedTask: null,
  isTaskFormOpen: false,
};

export const taskSlice = createSlice({
  name: taskSliceName,
  initialState,
  reducers: {
    editTask: (state: TaskState, action: PayloadAction<Task>) => {
      state.editedTask = action.payload;
      state.isTaskFormOpen = true;
    },
    editTaskFinished: (state: TaskState) => {
      state.isTaskFormOpen = false;
      state.editedTask = null;
    },
    openTaskForm: (state: TaskState) => {
      state.isTaskFormOpen = true;
    },
    closeTaskForm: (state: TaskState) => {
      state.isTaskFormOpen = false;
    },
  },
});
