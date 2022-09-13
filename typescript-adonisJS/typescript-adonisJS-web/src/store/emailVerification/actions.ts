/* eslint-disable @typescript-eslint/no-explicit-any */

import { mapErrorToState } from '@store/utils';
import { errorNotification } from 'utils/notifications';
import api from '@services/api';

import { Action, BaseHTTPResponse } from '@store/types';

import { EmailVerificationState, EmailVerifyCodeRequest } from './types';
import * as endpoints from './endpoints';

// send a VERIFICATION code
export const send: Action<EmailVerificationState> = (set) => async () => {
  set((state) => {
    state.sendState = { ...state.sendState, loading: true, error: false };
    console.log('Verification Code');
  });
  try {
    const result = await api.post<BaseHTTPResponse>(endpoints.SEND_CODE);
    set((state) => {
      state.sendState = { ...state.sendState, loading: false, message: result.data?.message };
    });
  } catch (error: any) {
    set((state) => {
      state.sendState = {
        ...state.sendState,
        loading: false,
        error: true,
        ...mapErrorToState(error),
      };
    });
  }
};

// when user clicked on verify button to VERIFY verification code
export const verify: Action<EmailVerificationState> =
  (set) => async (data: EmailVerifyCodeRequest) => {
    set((state) => {
      state.verifyState = { ...state.verifyState, loading: true, error: false };
      console.log('Verify Verification Code');
    });
    try {
      const result = await api.post<BaseHTTPResponse>(endpoints.VERIFY_CODE, data);
      set((state) => {
        state.verifyState = { ...state.verifyState, loading: false, message: result.data?.message };
      });
    } catch (error: any) {
      set((state) => {
        const err = mapErrorToState(error);
        state.verifyState = {
          ...state.verifyState,
          loading: false,
          error: true,
          ...err,
        };
        errorNotification('Error', err);
      });
    }
  };
