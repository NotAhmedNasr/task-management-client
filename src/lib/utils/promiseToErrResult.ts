import { ErrResult } from '../types/ErrResult';

export const promiseToErrResult = async <ResultType>(
  promise: Promise<ResultType>,
): Promise<ErrResult<ResultType>> => {
  try {
    return {
      err: null,
      result: await promise,
    };
  } catch (err: unknown) {
    return {
      err: err as Error,
      result: null,
    };
  }
};
