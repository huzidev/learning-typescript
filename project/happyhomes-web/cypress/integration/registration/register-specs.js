import {
  selectors,
  registrationPageTexts,
  testRegistraionCredentials,
  newTestRegistraionCredentials,
} from '../../Pages/RegistrationPage';
import faker from 'faker'


const goToRegisterPage = () => {
  cy.visit('/');
  cy.get(selectors.REGISTER_CTA).click();
  cy.wait(500);
};

describe('Registration Page', () => {
  it('should render Registration page successfully', () => {
    goToRegisterPage();
    expect(cy.get(selectors.REGISTER_CARD_HEADER).contains(registrationPageTexts.registerHeading));
  });

  it('should render full name required error', () => {
    goToRegisterPage();
    cy.get(selectors.FULL_NAME_FIELD).focus().clear();
    cy.get(selectors.REGISTRAION_SUBMIT_BUTTON).click();
    expect(cy.get(selectors.ERROR_ALERT).contains(registrationPageTexts.fullNameRequired));
  });

  it('should render full name min length error', () => {
    goToRegisterPage();
    cy.get(selectors.FULL_NAME_FIELD).focus().clear().type('a');
    cy.get(selectors.REGISTRAION_SUBMIT_BUTTON).click();
    expect(cy.get(selectors.ERROR_ALERT).contains(registrationPageTexts.fullNameMinLength));
  });

  it('should render only alphabets required error', () => {
    goToRegisterPage();
    cy.get(selectors.FULL_NAME_FIELD).focus().clear().type('Test12345');
    cy.get(selectors.REGISTRAION_SUBMIT_BUTTON).click();
    expect(cy.get(selectors.ERROR_ALERT).contains(registrationPageTexts.fullNameOnlyAlphabets));
  });

  it('should render email required error', () => {
    goToRegisterPage();
    cy.get(selectors.EMAIL_FIELD).focus().clear();
    cy.get(selectors.REGISTRAION_SUBMIT_BUTTON).click();
    expect(cy.get(selectors.ERROR_ALERT).contains(registrationPageTexts.emailRequired));
  });

  it('should render password required error', () => {
    goToRegisterPage();
    cy.get(selectors.PASSWORD_FIELD).clear();
    cy.get(selectors.REGISTRAION_SUBMIT_BUTTON).click();
    expect(cy.get(selectors.ERROR_ALERT).contains(registrationPageTexts.passwordRequired));
  });

  it('should render min password length error', () => {
    goToRegisterPage();
    cy.get(selectors.PASSWORD_FIELD).clear().type('abcs');
    cy.get(selectors.REGISTRAION_SUBMIT_BUTTON).click();
    expect(cy.get(selectors.ERROR_ALERT).contains(registrationPageTexts.passwordMinLengthError));
  });

  it('should render password does not match error when password and confirm password does not matches', () => {
    goToRegisterPage();
    cy.get(selectors.PASSWORD_FIELD).clear().type('Test123');
    cy.get(selectors.CONFIRM_PASSWORD_FIELD).clear().type('Test12345');
    cy.get(selectors.REGISTRAION_SUBMIT_BUTTON).click();
    expect(cy.get(selectors.ERROR_ALERT).contains(registrationPageTexts.passwordDoesNotMatch));
  });

  it('should render password does not match error when password and confirm password does not matches', () => {
    goToRegisterPage();
    cy.get(selectors.PASSWORD_FIELD).clear().type('Test123');
    cy.get(selectors.CONFIRM_PASSWORD_FIELD).clear().type('Test12345');
    cy.get(selectors.REGISTRAION_SUBMIT_BUTTON).click();
    expect(cy.get(selectors.ERROR_ALERT).contains(registrationPageTexts.passwordDoesNotMatch));
  });

  it('should render user already exist error when registration with already exist user', () => {
    goToRegisterPage();
      

    cy.get(selectors.FULL_NAME_FIELD).clear().type(testRegistraionCredentials.fullName);
    cy.get(selectors.EMAIL_FIELD).clear().type(testRegistraionCredentials.email);
    cy.get(selectors.PASSWORD_FIELD).clear().type(testRegistraionCredentials.password);
    cy.get(selectors.CONFIRM_PASSWORD_FIELD).clear().type(testRegistraionCredentials.password);
    cy.get(selectors.REGISTRAION_SUBMIT_BUTTON).click();
    cy.wait(500);
    expect(
      cy
        .get(selectors.USER_ALREADY_EXIST_TOAST)
        .contains(registrationPageTexts.invalidCredentailsMessage),
    );
  });

  it('should redirects to user on successfull registraion', () => {
    goToRegisterPage();
    cy.get(selectors.FULL_NAME_FIELD).clear().type(newTestRegistraionCredentials.fullName);
    cy.get(selectors.EMAIL_FIELD).clear().type(faker.internet.email());
    cy.get(selectors.PASSWORD_FIELD).clear().type(newTestRegistraionCredentials.password);
    cy.get(selectors.CONFIRM_PASSWORD_FIELD).clear().type(newTestRegistraionCredentials.password);
    cy.get(selectors.REGISTRAION_SUBMIT_BUTTON).click();
    cy.wait(500);
    expect(cy.url().should('eq', registrationPageTexts.verifyUser));
  });
});