/* eslint-disable @typescript-eslint/no-explicit-any */

import { mapErrorToState } from '@store/utils';
import api from '@services/api';

import { Action, BaseHTTPResponse } from '@store/types';

import { errorNotification } from 'utils/notifications';
import { useAuth } from '@store/auth';
import { User } from '@store/auth/types';
import {
  CreateUserReq,
  UserIDSubState,
  UpdateByMeReq,
  UserActionResult,
  UserDetail,
  UserFiltersReq,
  UserListState,
  UserState,
} from './types';
import * as endpoints from './endpoints';

// mapStateFromId will be used in getById, removeFromId, updateWithId
function mapStateFromId(
  id: number,
  map: { [id: number]: UserIDSubState },
  state: UserIDSubState,
): { [id: number]: UserIDSubState } {
  const getState = map[id] || {}; // map: { [id: number] } therefore we've used map[id] and getState will be either map[id] map array of id OR empty object {} since complete data of apartments is array of objects like array of data and object of meta is in a single object { data:[], meta:{} }
  return { ...map, [id]: { ...getState, ...state } };
}

// ViewProfile of loggedIn user
export const getMe: Action<UserState> = (set) => async () => {
  set((state) => {
    state.meState = { ...state.meState, loading: true, error: false };
  });
  console.log('TES IF WORKS');
  try {
    const result = await api.get<BaseHTTPResponse>(endpoints.GET_ME);
    console.log('message from ZUSTAND about messgae', result.data.message);
    set((state) => {
      state.meState = { ...state.meState, loading: false, message: result.data?.message };
    });
  } catch (error: any) {
    set((state) => {
      const err = mapErrorToState(error);
      state.meState = {
        ...state.meState,
        loading: false,
        error: true,
        ...err,
      };
      errorNotification('Error', err);
    });
  }
};

// Update info from Edit Profile
export const updateMe: Action<UserState> = (set) => async (data: UpdateByMeReq) => {
  set((state) => {
    state.meState = { ...state.meState, loading: true, error: false };
  });
  try {
    const result = await api.put<UserActionResult>(endpoints.EDIT_ME, data);
    set((state) => {
      useAuth.setState({ user: result.data.data as unknown as User });
      state.meState = { ...state.meState, loading: false, ...result.data };
    });
  } catch (e: any) {
    set((state) => {
      const err = mapErrorToState(e);
      state.meState = {
        ...state.meState,
        loading: false,
        error: true,
        ...err,
      };
      errorNotification('Error', err);
    });
  }
};

// create new user for admin
export const create: Action<UserState> = (set) => async (data: CreateUserReq) => {
  set((state) => {
    state.createState = { ...state.createState, loading: true, error: false };
  });
  try {
    const result = await api.post<BaseHTTPResponse>(endpoints.CREATE, data);
    set((state) => {
      state.createState = {
        ...state.createState,
        ...result.data, // we'll use ...result.data when we use data in result like here in const result = await api.post we've used (data) and if we didn't used data in result then we'll use message: result.data?.message like we did for getMe function
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

// getting list of user from manageUsers for admin
export const getList: Action<UserState> = (set) => async (page: number, data?: UserFiltersReq) => {
  set((state) => {
    state.list = { ...state.list, loading: true, error: false };
  });
  try {
    const result = await api.get<UserListState>(endpoints.LIST + page, {
      params: data,
    });
    set((state) => {
      // we've used ...result.data here because we've used params: data within (const result)
      state.list = { ...state.list, ...result.data, loading: false };
    });
  } catch (error: any) {
    set((state) => {
      const err = mapErrorToState(error);
      state.list = {
        ...state.list,
        loading: false,
        error: true,
        ...err,
      };
      errorNotification('Error', err);
    });
  }
};

// get single user data
export const getById: Action<UserState> = (set) => async (id: number) => {
  set((state) => {
    state.idsState = mapStateFromId(id, state.idsState, { loading: true, error: false });
  });
  try {
    const result = await api.get<UserIDSubState>(endpoints.GET_BY_ID + id);
    set((state) => {
      state.idsState = mapStateFromId(id, state.idsState, {
        ...result.data,
        loading: false,
        action: 'get',
      });
    });
  } catch (e: any) {
    set((state) => {
      const err = mapErrorToState(e);
      state.idsState = mapStateFromId(id, state.idsState, {
        loading: false,
        error: true,
        ...err,
      });
      errorNotification('Error', err);
    });
  }
};

// update user by ID for admin
export const updateById: Action<UserState> = (set) => async (id: number, data: UpdateByMeReq) => {
  set((state) => {
    state.idsState = mapStateFromId(id, state.idsState, { loading: true, error: false });
  });
  try {
    const result = await api.put<UserIDSubState>(endpoints.UPDATE_BY_ID + id, data);
    set((state) => {
      state.idsState = mapStateFromId(id, state.idsState, {
        ...result.data,
        loading: false,
        action: 'update',
      });
      if (state.list.data) {
        state.list.data = state.list.data.map((v) => {
          return v.id === id ? (result.data.data as UserDetail) : v;
        });
      }
    });
  } catch (e: any) {
    set((state) => {
      const err = mapErrorToState(e);
      state.idsState = mapStateFromId(id, state.idsState, {
        loading: false,
        error: true,
        ...err,
      });
      errorNotification('Error', err);
    });
  }
};

// remove user for ADMIN
export const removeById: Action<UserState> = (set) => async (id: number) => {
  set((state) => {
    state.idsState = mapStateFromId(id, state.idsState, { loading: true, error: false });
  });
  try {
    const result = await api.delete<UserIDSubState>(endpoints.REMOVE_BY_ID + id);
    set((state) => {
      state.idsState = mapStateFromId(id, state.idsState, {
        ...result.data,
        loading: false,
        action: 'remove',
      });
      // here we've used map method for removing USER if we used FILTER then user will be removed PERMANENTLY
      // this is mandatory when admin removed an User and re-activate the User BUT this one remove the user
      if (state.list.data) {
        state.list.data = state.list.data.map((v) => {
          return v.id === id ? (result.data.data as UserDetail) : v;
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
      errorNotification('Error', err);
    });
  }
};
