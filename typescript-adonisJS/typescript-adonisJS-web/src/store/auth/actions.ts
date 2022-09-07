import { mapErrorToState } from '@store/utils';
import { Action } from '@store/types';
import { errorNotification } from 'utils/notifications';

import api, { setToken } from '@services/api';

// localStorage to save user's Token
import storage from '@services/storage';

import { AuthState, AuthResponse, SignInRequest, SignUpRequest, initState } from './types';
import * as endpoints from './endpoints';
import KEYS from './keys';

export const signIn: Action<AuthState> = (set) => async (data: SignInRequest) => {
    set(state => {
        state.signInState = { ...state.signInState, loading: true, error: false };
    });
    try {
        const result = await api.post<AuthResponse>(endpoints.SIGN_IN, data);
        // if user is NOT banned
        if (result.data && !result.data.data.isBanned) {
            // setToken(result.data.token);
            await storage.setItem(KEYS.TOKEN, result.data.token);
        }
        set(state => {
            // for id, email, role, isActive, isBanned
            state.userData = result.data.data;;
            state.signInState = { ...state.signInState, loading: false };
        })
    } catch (e: any) {
        set(state => {
            const err = mapErrorToState(e);
            state.signInState = {
                ...state.signInState,
                loading: false,
                error: true,
                ...err
            };
            errorNotification('Error', e)
        });
    }
};

export const signUp: Action<AuthState> = (set) => async (data: SignUpRequest) => {
    set(state => {
        state.signUpState = { ...state.signUpState, loading: true, error: false }
    });
    try {
        const result = await api.post<AuthResponse>(endpoints.SIGN_UP, data);
        setToken(result.data.token);
        await storage.setItem(KEYS.TOKEN, result.data.token);
        set(state => {
            state.userData = result.data.data;
            state.signUpState = { ...state.signUpState, loading: false };
        });
    } catch (e: any) {
        set(state => {
            const err = mapErrorToState(e);
            state.signUpState = {
                ...state.signUpState,
                loading: false,
                error: true,
                ...err
            };
            errorNotification('Error', e);
        });
    }
};

// initUser for (GETTING) Save tokens from localStorage
export const initUser: Action<AuthState> = (set) => async () => {
    set(state => {
        state.initState = { ...state.initState, loading: true }
    })
    try {

    } catch (e: any) {
        set(state => {
            const err = mapErrorToState(e);
            state.initState = {
                ...state.initState,
                loading: false,
                error: true,
                ...err
            };
            errorNotification('Error', e);
        });
    }
}