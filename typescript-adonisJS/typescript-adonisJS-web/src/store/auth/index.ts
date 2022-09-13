import create from 'zustand';

import { immerMiddleware } from '@store/middlewares';
import { subState } from '@store/state';
import { AuthState } from './types';
import * as actions from './actions';

export const useAuth = create<AuthState>(
  immerMiddleware((set) => ({
    // subState with camel case are the initial Values ex loading: false and error: false
    // SubState with Capital (S) is the interface means types
    signInState: subState,
    signUpState: subState,
    signOutState: subState,
    // only initState takes init false while others takes (subState) for loading and error false
    initState: { ...subState, init: false },
    signIn: actions.signIn(set),
    signUp: actions.signUp(set),
    initUser: actions.initUser(set),
    signOut: actions.signOut(set),
    userVerified: actions.userVerified(set),
  })),
);
