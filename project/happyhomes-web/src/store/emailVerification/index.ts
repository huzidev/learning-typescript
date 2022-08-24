import create from 'zustand';

import { immerMiddleware } from '@store/middlewares';
import { subState } from '@store/state';

import { EmailVerificationState } from './types';
import * as actions from './actions';

export const useEmailVerification = create<EmailVerificationState>(
  immerMiddleware((set) => ({
    sendState: subState,
    verifyState: subState,
    send: actions.send(set),
    verify: actions.verify(set),
  })),
);
