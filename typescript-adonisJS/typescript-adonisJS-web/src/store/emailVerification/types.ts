import { SubState } from '@store/types';

export interface EmailVerificationState {
  sendState: SubState;
  verifyState: SubState;
  send: () => void;
  verify: (data: EmailVerifyCodeRequest) => void;
}

export interface EmailVerifyCodeRequest {
  code: string;
}
