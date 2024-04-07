import { makePersistedStore } from '.';

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makePersistedStore>['store'];
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppRootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// map actions to their respective action type
export const getActionTypes = <T extends object>(
  sliceName: string,
  actions: T,
) => {
  return Object.keys(actions).reduce(
    (agg, curr) => {
      return {
        ...agg,
        [curr]: `${sliceName}/${curr}`,
      };
    },
    {} as { [index in keyof T]: string },
  );
};
