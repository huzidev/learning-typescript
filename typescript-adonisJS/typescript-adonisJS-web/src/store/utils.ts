import { MapErrorToState } from './types';

// eslint-disable-next-line
export function mapErrorToState(error: Record<string, any>): MapErrorToState {
  // (string) for message and loading false, error true hence (any) type

  const resp: MapErrorToState = error.response.data;
  const state: MapErrorToState = {};
  if (resp.message) {
    state.message = resp.message;
  }
  if (resp.errors) {
    state.errors = resp.errors;
  }
  return state;
}
