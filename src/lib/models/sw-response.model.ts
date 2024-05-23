export type SwResponse<T> = {
  count: number;
  next: number | null;
  previous: number | null;
  results: T[];
};
