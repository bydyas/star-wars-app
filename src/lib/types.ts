export interface Heroes {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
}

export interface ServiceError {
  isError: boolean;
  message: string;
}
