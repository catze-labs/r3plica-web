interface ServerError {
  data: Record<string, unknown>;
  message: string;
}

interface ListResponse<T> {
  list: T[];
}
