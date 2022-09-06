import { SetState, GetState, State } from 'zustand';

export type Action<K extends State> = (
  set: SetState<K>,
  get?: GetState<K>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => (...args: any[]) => void; // any[] means array of any type

export interface BaseHTTPResponse {
  message?: string;
}

export interface HTTPFieldErrors {
  errors?: HTTPFieldError[];
}

export interface HTTPFieldError {
  rule?: string;
  field?: string;
  message: string;
}

export interface SubState extends HTTPFieldErrors {
  loading: boolean; // since loading will be either true or either false hence boolean
  error: boolean;
  message?: string;
}

// MapErrorToState is going to be used in Catch from try catch
export interface MapErrorToState extends HTTPFieldErrors, BaseHTTPResponse {}

export type SortType = 'asc' | 'desc';

export interface PaginationMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
}

// union can only be used by TYPE
export type ActionType = 'create' | 'update' | 'get' | 'remove';
