import { SubState } from '@store/types';

export interface ResetPasswordState {
  sendState: SubState; // subState have types for loading: boolean, error: boolean and message: string
  resetState: SubState;
  // send and is reset both are (FUNCTIONS)
  send: (data: ResetPasswordSendCodeRequest) => void;
  reset: (data: ResetPasswordRequest) => void;
}

export interface ResetPasswordSendCodeRequest {
  email: string; // reset password code will be received through email therefore we've defined type for email
}
export interface ResetPasswordRequest extends ResetPasswordSendCodeRequest {
  code: string; // while resting password needs verification code, password, ConfirmPassword and email for email we've used extends ResetPasswordSendCodeRequest in which type for email is defined
  password: string;
  passwordConfirmation: string;
}
