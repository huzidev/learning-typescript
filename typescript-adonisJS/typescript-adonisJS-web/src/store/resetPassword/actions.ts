/* eslint-disable @typescript-eslint/no-explicit-any */

import { mapErrorToState } from '@store/utils';
import api from '@services/api';

import { Action, BaseHTTPResponse } from '@store/types';

import { ResetPasswordState, ResetPasswordRequest, ResetPasswordSendCodeRequest } from './types';
import * as endpoints from './endpoints';

// will send a confirmation code for resetPassword
export const send: Action<ResetPasswordState> =
  (set) => async (data: ResetPasswordSendCodeRequest) => {
    set((state) => {
      // state.sendState initialize from their with ...state.sendState, loading: true, error: false then we can access it in Try and Catch
      state.sendState = { ...state.sendState, loading: true, error: false };
    });
    try {
      const result = await api.post<BaseHTTPResponse>(endpoints.SEND_CODE, data);
      console.log('message from ZUSTAND about result', result);
      console.log('message from ZUSTAND about data', result.data);
      console.log('message from ZUSTAND about messgae', result.data.message);
      set((state) => {
        state.sendState = { ...state.sendState, loading: false, message: result.data?.message }; // message will be (Password reset code sent successfully to your email) and this message is been defined in backend app/controller/authV1Controller
      });
    } catch (error: any) {
      set((state) => {
        state.sendState = {
          ...state.sendState,
          loading: false,
          error: true,
          // since we can't directly pass message for ERROR like we did above in TRY which is (message: result.data.message) therefore we've to use ...mapErrorToState(error),
          ...mapErrorToState(error),
        };
        console.log('Error from ERROR STATE', state.sendState);
      });
    }
  };

// after user enter verification code and save new password this function will run
export const reset: Action<ResetPasswordState> = (set) => async (data: ResetPasswordRequest) => {
  set((state) => {
    // state.resetState initialize from their ...state.resetState, loading: true, error: false then we can access it in Try and Catch
    state.resetState = { ...state.resetState, loading: true, error: false };
  });
  try {
    const result = await api.post<BaseHTTPResponse>(endpoints.RESET, data);
    console.log('INITIAL RESET PASSWORD');
    set((state) => {
      state.resetState = { ...state.resetState, loading: false, message: result.data?.message };
    });
  } catch (error: any) {
    set((state) => {
      console.log('test Reset Password ZUSTAND');
      state.resetState = {
        ...state.resetState,
        loading: false,
        error: true,
        // since we can't directly pass message for ERROR like we did above in TRY which is (message: result.data.message) therefore we've to use ...mapErrorToState(error),
        ...mapErrorToState(error),
      };
    });
  }
};
