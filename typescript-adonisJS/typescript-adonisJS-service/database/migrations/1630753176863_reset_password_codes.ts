import EmailVerificationCodes from './1630746019902_email_verification_codes'

export default class ResetPasswordCodes extends EmailVerificationCodes {
  protected tableName = 'reset_password_codes'
}
