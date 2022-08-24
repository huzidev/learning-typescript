import { errors } from '../../src/errors';

export const forgotPageTexts = {
  forgotPageHeading: 'Forgot password',
  loginHeaderText: 'Log In',
  emailRequired: errors.emailRequired,
  userNotExistText: 'No user is registered with this email',
  resetPasswordUrl: 'http://localhost:3000/reset_password?email=client1%40happyhomes.com',
};

export const selectors = {
  FORGOT_PASS_CARD_HEADER: '.ant-card-head-wrapper > .ant-card-head-title',
  ERROR_ALERT: '[role=alert]',
  EMAIL_FIELD: '[data-cy=email-field]',
  FORGOT_SUBMIT_BUTTON: '[data-cy=forgot-submit]',
  FORGOT_INVALID_CREDENTIALS_NOTIFICATION: '.ant-notification-notice-description',
  FORGOT_PASSWORD_PAGE_CTA: '[data-cy=forgot-password-page-cta]',
  LOGIN_CTA: '[data-cy=login-cta]',
  LOGIN_CARD_HEADER: '[data-cy=auth-card-header]',
  RESET_PASSWORD: '[data-cy=reset-password-field]',
  CONFIRM_RESET_PASSWORD: '[data-cy=creset-password-field]',
  RESET_SUBMIT: '[data-cy=reset-submit]',
};

export const testCredentials = {
  email: 'client1@happyhomes.com',
  password: 'admin1',
  invalid_email: 'invalid_email@gmail.com',
  dummy_code: '108869',
};
