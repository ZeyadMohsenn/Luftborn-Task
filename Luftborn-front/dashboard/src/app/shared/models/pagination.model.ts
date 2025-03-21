export interface Pagination {
  pageNumber: number;
  pageSize: number;
}

export interface Response<T> {
  icon?: string;
  succeeded: boolean;
  messages: string[];
  data: T;
}

export interface PaginationResponse<T> {
  count: number;
  data: T[];
}
