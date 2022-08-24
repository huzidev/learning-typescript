import create from 'zustand';

import { immerMiddleware } from '@store/middlewares';
import { subState } from '@store/state';

import { ResetPasswordState } from './types';
import * as actions from './actions';

// this useResetPassword will be used as import { useResetPassword } from '@store/resetPassword';
export const useResetPassword = create<ResetPasswordState>(
  immerMiddleware((set) => ({
    sendState: subState,
    resetState: subState,
    send: actions.send(set),
    reset: actions.reset(set),
  })),
);
