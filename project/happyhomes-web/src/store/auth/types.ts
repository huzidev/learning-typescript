import { HTTPFieldErrors, SubState } from '@store/types';

export interface InitSubType extends SubState {
  init: boolean;
}

export interface AuthState {
  signInState: SubState;
  signUpState: SubState;
  initState: InitSubType;
  signOutState: SubState;
  user?: User | null;
  signIn: (data: SignInRequest) => void;
  signUp: (data: SignUpRequest) => void;
  initUser: () => void;
  signOut: () => void;
  userVerified: () => void;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest extends SignInRequest {
  // extends SignInRequest helps us to extend it's property in SignUpRequest therefore we don't have to write email: string, password: string as it is already defined in SignInRequest
  name: string;
  isRealtor: boolean;
  passwordConfirmation: string;
}

export interface AuthResponse extends HTTPFieldErrors {
  token: string;
  message?: string;
  data: User;
}

export const roles = ['client', 'realtor', 'admin', 'super-admin'] as const;
export type UserRole = typeof roles[number];

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  facebook?: string;
  google?: string;
  isActive: boolean;
  isTheme: boolean;
  isVerified: boolean;
  isBanned: boolean;
}
