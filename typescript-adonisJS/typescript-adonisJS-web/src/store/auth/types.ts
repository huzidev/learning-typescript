import { HTTPFieldErrors, SubState } from '@store/types';

export interface InitSubType extends SubState {
    init: boolean;
}


export const roles = ['client', 'realtor', 'admin', 'super-admin'] as const;
export type UserRole = typeof roles[number];

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    isActive: boolean;
    isTheme: boolean;
    isVerified: boolean;
    isBanned: boolean;
}

export interface AuthState {
    signInState: SubState
    signUpState: SubState
    signOutState: SubState
}