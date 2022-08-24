import create from 'zustand';

import { immerMiddleware } from '@store/middlewares';
import { subState } from '@store/state'; // subState are loading, error, message types etc

import { ApartmentState } from './types';
import * as actions from './actions'; // all LOGICS are written in ./actions files

export const apartmentInitialState = {
  idsState: {},
  listByUserIDState: { ...subState, data: [] },
  createState: { ...subState },
  defaultFilters: { ...subState },
  listState: { ...subState, data: [] },
  myListState: { ...subState, data: [] },
  mapListState: { ...subState, data: [] },
  publicListState: { ...subState, data: [] },
};

// now this useApartment will be used in index.tsx files in pages to show data and we'll import it like import { useApartment } from '@store/apartment';
export const useApartment = create<ApartmentState>( // this ApartmentState is used in every functions in actions.ts file like Action<ApartmentState>
  immerMiddleware((set) => ({
    defaultFilters: { ...subState }, // subState has state like loading, error
    getDefaultFilters: actions.getDefaultFilters(set), // all the LOGICS are in action and (getDefaultFilters )is the function created inside ./actions

    myListState: { ...subState, data: [] },
    getMyList: actions.getMyList(set),

    mapListState: { ...subState, data: [] },
    getMapList: actions.getMapList(set),

    listByUserIDState: { ...subState, data: [] },
    getListByUserID: actions.getListByUserID(set),

    listState: { ...subState, data: [] },
    getList: actions.getList(set),

    publicListState: { ...subState, data: [] },
    getPublicList: actions.getPublicList(set),
    resetPublicList: () =>
      set((state) => {
        state.publicListState = { ...subState, data: [] };
      }),

    createState: { ...subState },
    create: actions.create(set),

    // update && remove && getByID
    idsState: {},
    getById: actions.getById(set),
    updateById: actions.updateById(set),
    removeById: actions.removeById(set),

    resetIdState: () =>
      set((state) => {
        state.idsState = {};
      }),
  })),
);
