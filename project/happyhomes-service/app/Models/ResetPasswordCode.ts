import EmailVerificationCode from './EmailVerificationCode'

export default class ResetPasswordCode extends EmailVerificationCode {
  public static table = 'reset_password_codes'
}
