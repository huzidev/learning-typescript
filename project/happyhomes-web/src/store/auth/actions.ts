/* eslint-disable @typescript-eslint/no-explicit-any */
import { apartmentInitialState, useApartment } from '@store/apartment';
import { userInitialState, useUser } from '@store/user';
import { mapErrorToState } from '@store/utils';
import { Action } from '@store/types';
import { errorNotification } from 'utils/notifications';

// will parsed the token saved in localStorage
import api, { setToken } from '@services/api';

// for localStorage to save Token
import storage from '@services/storage';

import { AuthResponse, AuthState, SignInRequest, SignUpRequest } from './types';
import * as endpoints from './endpoints';
import KEYS from './keys';

// LOGIN
export const signIn: Action<AuthState> = (set) => async (data: SignInRequest) => {
  set((state) => {
    state.signInState = { ...state.signInState, loading: true, error: false };
  });
  try {
    const result = await api.post<AuthResponse>(endpoints.SIGN_IN, data);
    // means if User is NOT banned
    if (result.data && !result.data.data.isBanned) {
      setToken(result.data.token);
      // storing token in LOCAL STORAGE for setItem it'll take two parameters first is KEY and other is Token
      await storage.setItem(KEYS.TOKEN, result.data.token);
    }
    console.log('DATA from login', result.data);
    console.log('TOKEN', result.data.token);
    set((state) => {
      // result.data.data brings all the information like user-role, name, email, id, isActive, isBan
      state.user = result.data.data;
      state.signInState = { ...state.signInState, loading: false };
      console.log('STATE USER', state.user);
    });
  } catch (error: any) {
    set((state) => {
      const err = mapErrorToState(error);
      state.signInState = {
        ...state.signInState,
        loading: false,
        error: true,
        ...err,
      };
      errorNotification('Error', err);
    });
  }
};

// register as New User
export const signUp: Action<AuthState> = (set) => async (data: SignUpRequest) => {
  set((state) => {
    state.signUpState = { ...state.signUpState, loading: true, error: false };
  });
  try {
    const result = await api.post<AuthResponse>(endpoints.SIGN_UP, data);
    setToken(result.data.token);
    // so new token will be saved in localStorage as new user loggedIn
    await storage.setItem(KEYS.TOKEN, result.data.token);
    set((state) => {
      // result.data.data brings all the information like user-role, name, email, id, isActive, isBan
      state.user = result.data.data;
      state.signUpState = { ...state.signUpState, loading: false };
    });
  } catch (error: any) {
    set((state) => {
      const err = mapErrorToState(error);
      state.signUpState = {
        ...state.signUpState,
        loading: false,
        error: true,
        ...err,
      };
      errorNotification('Error', err);
    });
  }
};

// for authentication of TOKENS and shows user's details for view profile
export const initUser: Action<AuthState> = (set) => async () => {
  try {
    set((state) => {
      state.initState = { ...state.initState, loading: true };
      console.log('INIT INIT A', state.initState);
    });
    const token = await storage.getItem<string>(KEYS.TOKEN);
    if (token) {
      console.log('INIT INIT BB', token);
      setToken(token);
      console.log('INIT INIT CCC', token);
      const result = await api.get<AuthResponse>(endpoints.USER_DETAILS);
      console.log('INIT INIT DDDD', result);
      set((state) => {
        state.user = result.data.data;
        state.initState = { ...state.initState, loading: false, init: true };
        console.log('INIT INIT EEEEE', result.data.data);
      });
      return;
    }
    set((state) => {
      state.initState = { ...state.initState, loading: true, init: true };
    });
  } catch (error: any) {
    await storage.removeItem(KEYS.TOKEN);
    setToken(null);
    set((state) => {
      state.initState = {
        ...state.initState,
        loading: true,
        init: true,
        error: true,
        ...mapErrorToState(error),
      };
    });
  }
};

// for LogOut
export const signOut: Action<AuthState> = (set) => async () => {
  set((state) => {
    state.signOutState = { ...state.signOutState, loading: true, error: false };
  });
  try {
    await api.post(endpoints.SIGN_OUT);
    // remove token as user loggedOut
    storage.removeItem(KEYS.TOKEN);
    // setToken to null as user LoggedOut
    setToken(null);
    // apartments filters and if admin then user's filer will be changed back to initialState/default form when user loggedOut
    useApartment.setState(apartmentInitialState);
    useUser.setState(userInitialState);
    set((state) => {
      // during logIn we says state.user = result.data.data which brings data like user-role, name, email BUT during LOGOUT we'll set this state.user to NULL
      state.user = null;
      state.signOutState = { ...state.signOutState, loading: false };
    });
  } catch (error: any) {
    set((state) => {
      const err = mapErrorToState(error);
      state.signOutState = {
        ...state.signOutState,
        loading: false,
        error: true,
        ...err,
      };
      errorNotification('Error', err);
    });
  }
};

export const userVerified: Action<AuthState> = (set) => async () => {
  set((state) => {
    if (state.user) {
      state.user.isVerified = true;
    }
  });
};
