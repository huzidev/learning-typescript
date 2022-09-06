import { SetState, GetState, State } from 'zustand';

export type Action<K extends State> = (
    set: SetState<K>,
    get?: GetState<K>,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => (...args: any[]) => void;


// RESPONSE in the form of message
export interface BaseHTTPResponse {
    message?: string;
}

export interface HTTPFieldError {
    rule?: string;
    field?: string;
    message: string;
}

export interface HTTPFieldErrors {
    errors?: HTTPFieldError[];
}

export interface SubState extends HTTPFieldError {
    loading: boolean;
    error: boolean;
    message?: string;
}

// will used in Catch from try catch
export interface MapErrorToState extends HTTPFieldErrors, BaseHTTPResponse {}