interface ErrResultError {
  err: Error;
  result: null;
}

interface ErrResultSuccess<ResultType> {
  err: null;
  result: ResultType;
}

export type ErrResult<ResultType> =
  | ErrResultError
  | ErrResultSuccess<ResultType>;
