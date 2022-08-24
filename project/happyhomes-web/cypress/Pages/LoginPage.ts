import { errors } from '../../src/errors';

export const loginPageTexts = {
  loginHeading: 'Log In',
  emailRequired: errors.emailRequired,
  passwordRequired: errors.passwordRequired,
  passwordMinLengthError: 'Password should be at least 6 characters long',
  invalidCredentailsMessage: 'Failed to login',
  dashboardPageUrl: 'http://localhost:3000/home',
};

export const selectors = {
  LOGIN_CARD_HEADER: '[data-cy=auth-card-header]',
  ERROR_ALERT: '[role=alert]',
  EMAIL_FIELD: '[data-cy=email-field]',
  LOGIN_SUBMIT_BUTTON: '[data-cy=auth-submit]',
  PASSWORD_FIELD: '[data-cy=password-field]',
  LOGIN_INVALID_CREDENTIALS_NOTIFICATION: '.ant-notification-notice-message',
};

export const testCredentials = {
  email: 'admin1@happyhomes.com',
  password: 'admin1',
};
