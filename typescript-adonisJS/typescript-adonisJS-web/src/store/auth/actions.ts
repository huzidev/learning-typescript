import { mapErrorToState } from '@store/utils';
import { Action } from '@store/types';
import { errorNotification } from 'utils/notifications';

import api, { setToken } from '@services/api';

// localStorage to save user's Token
import storage from '@services/storage';

import { AuthState, SignInRequest } from './types';
import * as endpoints from './endpoints';
import KEYS from './keys';

export const signIn: Action<AuthState> = (set) => async (data: SignInRequest) => {
    set(state => {
        state.signInState = { ...state.signInState, loading: true, error: false };
    });
    try {
        const result = await api.post<AuthState>(endpoints.SIGN_IN, data)

    } catch (e) {
        set(state => {
            const err = mapErrorToState(e)
            state.signInState = {
                ...state.signInState,
                loading: false,
                error: true,
                ...err
            };
            errorNotification('Error', e)
        })
    }
}