export interface Pagination {
  page: number;
  pageSize: number;
  total?: number;
}

export interface GetManyResponseType<Type> {
  data: Type[];
  meta: {
    pagination: Pagination;
  };
}
