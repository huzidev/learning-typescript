import { State, StateCreator } from 'zustand';
import produce, { Draft } from 'immer';

// <T> is generic and is used when type is not same means it can be string, object, int therefore we can just use <T> generic
export const immerMiddleware =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (partial, replace) => {
        const nextState =
          typeof partial === 'function'
            ? produce(partial as (state: Draft<T>) => T)
            : (partial as T);
        return set(nextState, replace);
      },
      get,
      api,
    );
