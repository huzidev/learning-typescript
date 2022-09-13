/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '@store/types'; // specify types like boolean, number, strings etc and necessary actions, parameters from ZUSTAND are already defined here

import { mapErrorToState } from '@store/utils';
import { useAuth } from '@store/auth';

import api from '@services/api'; // api is defined with AXIOS

import { errorNotification } from 'utils/notifications';

// for all the already specified types like number, boolean, string etc
import {
  ApartmentActionResult,
  ApartmentCreateReq,
  ApartmentDetail,
  ApartmentFiltersResult,
  ApartmentIDSubState,
  ApartmentList, // ApartmentList includes data[], meta and filters
  ApartmentListFilters,
  ApartmentState,
  ApartmentUpdateReq,
} from './types';
import * as endpoints from './endpoints'; // endpoints includes all the paths like export const LIST_BY_ME = '/apartment/v1/list/me/';

// mapIDListStateFromId will be used at getListByUserID since user will see the (list state of apartments) according to realtor ID
function mapIDListStateFromId(
  id: number,
  map: { [id: number]: ApartmentList },
  state: ApartmentList,
): { [id: number]: ApartmentList } {
  const getState = map[id] || {}; // map: { [id: number] } therefore we've used map[id] and getState will be either map[id] map array of id OR empty object {} since complete data of apartments is array of objects like array of data and object of meta is in a single object { data:[], meta:{} }
  return { ...map, [id]: { ...getState, ...state } };
}

// mapStateFromId will be used in getById, removeFromId, updateWithId
function mapStateFromId(
  id: number,
  map: { [id: number]: ApartmentIDSubState },
  state: ApartmentIDSubState,
): { [id: number]: ApartmentIDSubState } {
  const getState = map[id] || {};
  return { ...map, [id]: { ...getState, ...state } };
}

export const getDefaultFilters: Action<ApartmentState> = (set, get) => async () => {
  if (get && get().defaultFilters.data) {
    return;
  }
  set((state) => {
    state.defaultFilters = { ...state.defaultFilters, loading: true, error: false };
  });
  try {
    // for getting DefaultFilters like minRooms 0 and maxRooms 10
    const result = await api.get<ApartmentFiltersResult>(endpoints.DEFAULT_FILTERS); // endpoints have defaultFilters path
    set((state) => {
      state.defaultFilters = { ...state.defaultFilters, ...result.data, loading: false }; // ...result.data is the byDefault filters minSize 33 maxSize 1000
    });
    console.log('Result Data', result.data);
  } catch (error: any) {
    set((state) => {
      const err = mapErrorToState(error);
      state.defaultFilters = {
        ...state.defaultFilters,
        loading: false,
        error: true, // since catch catches the error therefore (error's state) will be true here
        ...err,
      };
      errorNotification('Error', err);
      console.log('state for apartments filter error', state.defaultFilters);
    });
  }
};

// list for manage apartments
export const getMyList: Action<ApartmentState> =
  (set) => async (page: number, data?: ApartmentListFilters) => {
    set((state) => {
      state.myListState = { ...state.myListState, loading: true, error: false };
    });
    try {
      // for getting apartmentList according to type therefore we've used ApartmentList for getMyList, getList, getListByUserId, getPublicList
      const result = await api.get<ApartmentList>(endpoints.LIST_BY_ME + page, {
        // since we are getting apartment therefore we've used .get method
        // page is the number of that apartment list for example if page 1 have 25 apartment then page 2 will have more 25 apartments
        // params: data is for filter when Realtor wanted to see their apartment in ascending or descending order like apartments NAME with ascending or descending order
        params: data,
      });
      set((state) => {
        state.myListState = { ...state.myListState, ...result.data, loading: false };
      });
    } catch (error: any) {
      set((state) => {
        const err = mapErrorToState(error);
        state.myListState = {
          ...state.myListState,
          loading: false,
          error: true,
          ...err,
        };
        errorNotification('Error', err);
      });
    }
  };
// for getting complete List of apartments when admin clicked on manage apartments
export const getList: Action<ApartmentState> =
  (set) => async (page: number, data?: ApartmentListFilters) => {
    set((state) => {
      state.listState = { ...state.listState, loading: true, error: false };
    });
    try {
      // page is used because first page will shows just 25 apartments and as page increase the number of apartments per page also increase
      const result = await api.get<ApartmentList>(endpoints.LIST + page, {
        // params: data is for filters
        params: data,
      });
      set((state) => {
        state.listState = { ...state.listState, ...result.data, loading: false };
      });
    } catch (error: any) {
      set((state) => {
        const err = mapErrorToState(error);
        state.listState = {
          ...state.listState,
          loading: false,
          error: true,
          ...err,
        };
        errorNotification('Error', err);
      });
    }
  };

// for all the apartments list uploaded by specific realtor
export const getListByUserID: Action<ApartmentState> =
  (set) => async (userId: number, page: number) => {
    set((state) => {
      // user will see the apartment ACCORDING TO realtorID OR userId therefore we'll use it mapIDListStateFromId BECAUSE of userID
      state.listByUserIDState = mapIDListStateFromId(userId, state.listByUserIDState, {
        loading: true,
        error: false,
      });
    });
    try {
      // it is mandatory to use ${page} at the end otherwise Load More button will not fetch new apartments
      const result = await api.get<ApartmentList>(`${endpoints.LIST + userId}/${page}`, {
        // userId so apartments from that specific realtor can be shown and page is like page 1 will have 25 apartments and page 2 will have further more 25 apartments
        // params: data,
      });
      set((state) => {
        // state.listByUserIDState = mapIDListStateFromId(userId, state.listByUserIDState, {
        //   ...result.data,
        //   loading: false,
        // });
        state.listByUserIDState[userId].loading = false;
        // these conditions below are for Load More when user clicked on load more then new apartments will fetched and previous apartments also remains save
        console.log('LOGIC for data meta', result);
        if (
          state.listByUserIDState[userId].meta &&
          result.data.meta &&
          // result.data.meta.currentPage is initially first page
          result.data.meta?.currentPage > state.listByUserIDState[userId].meta!.currentPage
        ) {
          state.listByUserIDState[userId].data = [
            ...(state.listByUserIDState[userId].data ?? []),
            ...(result.data.data ?? []),
          ];
        } else {
          state.listByUserIDState[userId].data = result.data.data;
        }
        state.listByUserIDState[userId].meta = result.data.meta;
        // state.listByUserIDState[userId].filters = data;
      });
    } catch (error: any) {
      set((state) => {
        const err = mapErrorToState(error);
        state.listByUserIDState = mapIDListStateFromId(userId, state.listByUserIDState, {
          loading: false,
          error: true,
          ...err,
        });
        errorNotification('Error', err);
      });
    }
  };
// for all the apartments when user is at home page
export const getPublicList: Action<ApartmentState> =
  (set) => async (page: number, data?: ApartmentListFilters) => {
    set((state) => {
      state.publicListState = { ...state.publicListState, loading: true, error: false };
    });
    try {
      const result = await api.get<ApartmentList>(endpoints.LIST + page, {
        params: data,
      });
      set((state) => {
        state.publicListState.loading = false;
        if (
          state.publicListState.meta &&
          result.data.meta &&
          result.data.meta?.currentPage > state.publicListState.meta?.currentPage
        ) {
          state.publicListState.data = [
            // ?? is called nullish coalescing operator it is used for only UNDEFINED AND NULL values NOT FOR BOOLEAN, EMPTY string we uses nullish coalescing operator for getting rid or checking BOOLEAN, EMPTY STRING
            // basically right side of nullish coalescing operator is like ELSE condition means if value is null or undefined then right side of condition will be prints like in this case it is empty ARRAY
            // UNDEFINED AND NULL both are nullish values
            ...(state.publicListState.data ?? []), // here it means if public list is empty means NO APARTMENT available then show only empty array therefor when client loggedIn it shows empty array in network
            ...(result.data.data ?? []),
          ];
        } else {
          state.publicListState.data = result.data.data;
        }
        state.publicListState.meta = result.data.meta;
        state.publicListState.filters = data;
      });
    } catch (error: any) {
      set((state) => {
        const err = mapErrorToState(error);
        state.publicListState = {
          ...state.publicListState,
          loading: false,
          error: true,
          ...err,
        };
        errorNotification('Error', err);
      });
    }
  };

// for getting all the apartment on map view of city like karachi, islamabad etc
export const getMapList: Action<ApartmentState> = (set) => async (data?: ApartmentListFilters) => {
  set((state) => {
    state.mapListState = { ...state.mapListState, loading: true, error: false };
  });
  try {
    const result = await api.get<ApartmentList>(endpoints.LIST + 1, {
      params: data,
    });
    set((state) => {
      state.mapListState.loading = false;
      // this will load all the apartments available in the selected city
      // this is mandatory
      state.mapListState.data = result.data.data;
      // this will show all the available apartments according to the screen size if user ZOOM OUT at maximum then total apartments could be 1000+ but as user zoom in then only apartments visible will be shown according to the screen size
      state.mapListState.meta = result.data.meta;
    });
  } catch (error: any) {
    set((state) => {
      const err = mapErrorToState(error);
      state.mapListState = {
        ...state.mapListState,
        loading: false,
        error: true,
        ...err,
      };
      errorNotification('Error', err);
    });
  }
};

// for creating apartments
export const create: Action<ApartmentState> = (set) => async (data: ApartmentCreateReq) => {
  // ApartmentCreateReq have all the types define like name, description, size, price, rooms etc
  set((state) => {
    state.createState = { ...state.createState, loading: true, error: false };
  });
  try {
    // since user is performing action while creating, updating, removing and gettingApartmentByID therefore we've used ApartmentActionResult for these 4 functions
    const result = await api.post<ApartmentActionResult>(endpoints.CREATE, data); // post method because CREATING APARTMENTS
    set((state) => {
      state.createState = {
        ...state.createState,
        ...result.data,
        loading: false,
      };
    });
  } catch (error: any) {
    set((state) => {
      const err = mapErrorToState(error);
      state.createState = {
        ...state.createState,
        loading: false,
        error: true,
        ...err,
      };
      errorNotification('Error', err);
    });
  }
};

// for getting any specific apartment
export const getById: Action<ApartmentState> = (set) => async (id: number) => {
  set((state) => {
    state.idsState = mapStateFromId(id, state.idsState, {
      loading: true,
      error: false,
    });
  });
  try {
    const result = await api.get<ApartmentActionResult>(endpoints.GET_BY_ID + id);
    set((state) => {
      state.idsState = mapStateFromId(id, state.idsState, {
        // necessary to use ...result.data because we've used mapStateFromId
        ...result.data,
        loading: false,
        error: false,
        action: 'get', // we'll only define action when we uses mapStateFromId
      });
    });
  } catch (error: any) {
    set((state) => {
      const err = mapErrorToState(error);
      state.idsState = mapStateFromId(id, state.idsState, {
        loading: false,
        error: true,
        ...err,
      });
      errorNotification('Error', err);
    });
  }
};

// for updating apartment
export const updateById: Action<ApartmentState> =
  (set) => async (id: number, data: ApartmentUpdateReq) => {
    set((state) => {
      state.idsState = mapStateFromId(id, state.idsState, {
        loading: true,
        error: false,
      });
    });
    try {
      const result = await api.put<ApartmentActionResult>(endpoints.UPDATE_BY_ID + id, data); // using PUT method because UPDATING APARTMENT
      set((state) => {
        state.idsState = mapStateFromId(id, state.idsState, {
          // necessary to use ...result.data because we've used mapStateFromId
          ...result.data,
          loading: false,
          error: false,
          action: 'update', // METHOD is put but actionType is UPDATE and we'll only define action when we uses mapStateFromId
        });
        // when clicked on Manage Apartments
        // this is mandatory when admin removed an apartment and re-activate the apartment BUT this one re-activate the apartments
        if (state.listState.data?.length) {
          state.listState.data = state.listState.data.map((v) => {
            return v.id.toString() === id.toString()
              ? { ...v, ...(result.data.data as ApartmentDetail) }
              : v;
          });
        }
        // when user is at Home Page
        // if (state.publicListState.data?.length) {
        //   state.publicListState.data = state.publicListState.data.map((v) => {
        //     return v.id.toString() === id.toString()
        //       ? { ...v, ...(result.data.data as ApartmentDetail) }
        //       : v;
        //   });
        // }
      });
    } catch (error: any) {
      set((state) => {
        const err = mapErrorToState(error);
        state.idsState = mapStateFromId(id, state.idsState, {
          loading: false,
          error: true,
          ...err,
        });
        errorNotification('Error', err);
      });
    }
  };

// for removing apartments
export const removeById: Action<ApartmentState> = (set) => async (id: number) => {
  set((state) => {
    state.idsState = mapStateFromId(id, state.idsState, { loading: true, error: false });
  });
  try {
    const result = await api.delete<ApartmentActionResult>(endpoints.REMOVE_BY_ID + id); // using DELETE method
    set((state) => {
      state.idsState = mapStateFromId(id, state.idsState, {
        ...result.data,
        loading: false,
        error: false,
        action: 'remove', // method is DELETE but action type is remove
      });

      const isRealtor = useAuth.getState().user?.role === 'realtor'; // to check if realtor is deleting own apartment
      // .length is used to know if their is any apartment
      if (isRealtor && state.myListState?.data?.length) {
        state.myListState.data = state.myListState.data?.filter(
          (v) => v.id.toString() !== result.data.data.id.toString(),
        );
      }
      // if (isRealtor && state.publicListState?.data?.length) {
      //   state.publicListState.data = state.publicListState.data?.filter(
      //     (v) => v.id.toString() !== result.data.data.id.toString(),
      //   );
      // }
      // when admin wanted to remove apartments it'll be only de-activate but not removed permanently but if REALTOR wanted to delete apartment then it'll be removed permanently because for realtor we are using .FILTER
      // this is mandatory when admin removed an apartment and re-activate the apartment BUT this one removes the apartments
      if (state.listState.data) {
        state.listState.data = state.listState.data.map((v) => {
          return v.id === id ? (result.data.data as ApartmentDetail) : v;
        });
      }
    });
  } catch (error: any) {
    set((state) => {
      const err = mapErrorToState(error);
      state.idsState = mapStateFromId(id, state.idsState, {
        loading: false,
        error: true,
        ...err,
      });
      // it'll show error type in notification
      errorNotification('Error', err);
    });
  }
};
