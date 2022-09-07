import create from 'zustand';

import { immerMiddleware } from '@store/middlewares';

// initial VALUES
import { subState } from '@store/state';
import { AuthState } from './types';


export const useAuth = create<AuthState>(
    immerMiddleware(set => ({
        signInState: subState
        signUpState: subState
        signOutState: subState
    }))
)