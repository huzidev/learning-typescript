import create from 'zustand';

import { immerMiddleware } from '@store/middlewares';
import { subState } from '@store/state';

import * as actions from './actions';
import { UserState } from './types';

export const userInitialState = {
  idsState: {},
  meState: subState,
  createState: subState,
  list: { ...subState, data: [] },
};

export const useUser = create<UserState>(
  immerMiddleware((set) => ({
    meState: subState,
    idsState: {},
    list: { ...subState, data: [] },
    createState: subState,

    // create, getList, getMe, updateMe etc these functions are already created in ./actions and we've imported (*, all) as actions from './actions'
    create: actions.create(set),
    getList: actions.getList(set),

    getMe: actions.getMe(set),
    updateMe: actions.updateMe(set),

    getById: actions.getById(set),
    updateById: actions.updateById(set),
    removeById: actions.removeById(set),

    resetIdState: () =>
      set((state) => {
        state.idsState = {};
      }),
  })),
);
