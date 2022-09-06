import { errors } from '../../src/errors';

export const registrationPageTexts = {
  registerHeading: 'Register',
  fullNameRequired: 'Please enter your name',
  fullNameMinLength: 'Name should be at least 2 characters long',
  fullNameOnlyAlphabets: 'Only alphabets are allowed',
  emailRequired: errors.emailRequired,
  passwordRequired: errors.passwordRequired,
  passwordMinLengthError: 'Password should be at least 6 characters long',
  passwordDoesNotMatch: 'The two passwords that you entered do not match!',
  invalidCredentailsMessage: 'Failed to register',
  verifyUser: 'http://localhost:3000/verify_user',
};

export const selectors = {
  REGISTER_CARD_HEADER: '[data-cy=auth-card-header]',
  REGISTER_CTA: '[data-cy=register-cta]',
  FULL_NAME_FIELD: '[data-cy=fullname-field]',
  ERROR_ALERT: '[role=alert]',
  EMAIL_FIELD: '[data-cy=email-field]',
  REGISTRAION_SUBMIT_BUTTON: '[data-cy=auth-submit]',
  PASSWORD_FIELD: '[data-cy=password-field]',
  CONFIRM_PASSWORD_FIELD: '[data-cy=confirm-password-field]',
  USER_ALREADY_EXIST_TOAST: '.ant-notification-notice-message',
};

export const testRegistraionCredentials = {
  fullName: 'ete testing',
  email: 'admin1@happyhomes.com',
  password: 'admin1',
};

export const newTestRegistraionCredentials = {
  fullName: 'test user',
  email: 'testuser@happyhomes.com',
  password: 'admin1',
};
