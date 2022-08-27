import { selectors, loginPageTexts, testCredentials } from '../../Pages/LoginPage';

describe('Login Page', () => {
  it('should render login page successfully', () => {
    // visit homepage
    cy.visit('/');
    // wait 500ms
    cy.wait(500);
    // means login page must contain header and text some text like loginHeading
    expect(cy.get(selectors.LOGIN_CARD_HEADER).contains(loginPageTexts.loginHeading));
  });

  // it('Email test', () => {
  //   cy.visit('/');
  //   cy.wait(500);
  //   cy.get(selectors.EMAIL_FIELD).focus().clear().type('Test123123123');
  //   cy.wait(2000);
  //   cy.get(selectors.LOGIN_SUBMIT_BUTTON).click();
  //   expect(cy.get(selectors.ERROR_ALERT).contains(loginPageTexts.emailRequired));
  // });


  it('should render required error when login form is submit without email', () => {
    cy.visit('/');
    cy.wait(500);
    cy.get(selectors.EMAIL_FIELD).clear();
    cy.get(selectors.LOGIN_SUBMIT_BUTTON).click();
    expect(cy.get(selectors.ERROR_ALERT).contains(loginPageTexts.emailRequired));
  });

  it('should render required error when login form is submit without password', () => {
    cy.visit('/');
    cy.wait(500);
    cy.get(selectors.PASSWORD_FIELD).clear();
    cy.get(selectors.LOGIN_SUBMIT_BUTTON).click();
    expect(cy.get(selectors.ERROR_ALERT).contains(loginPageTexts.passwordRequired));
  });

  it('should render min length error when login form is submit with short password', () => {
    cy.visit('/');
    cy.wait(500);
    cy.get(selectors.PASSWORD_FIELD).focus().clear().type('Test');
    cy.get(selectors.LOGIN_SUBMIT_BUTTON).click();
    expect(cy.get(selectors.ERROR_ALERT).contains(loginPageTexts.passwordMinLengthError));
  });

  it('should render toast with error when invalid credentials are submitted', () => {
    cy.visit('/');
    cy.wait(500);
    cy.get(selectors.EMAIL_FIELD).focus().clear().type(testCredentials.email);
    cy.get(selectors.PASSWORD_FIELD).focus().clear().type('Test123123123');
    cy.get(selectors.LOGIN_SUBMIT_BUTTON).click();
    cy.wait(100);
    expect(
      cy
        .get(selectors.LOGIN_INVALID_CREDENTIALS_NOTIFICATION)
        .contains(loginPageTexts.invalidCredentailsMessage),
    );
  });

  it('should redirect to dashboard on successfull login', () => {
    cy.visit('/');
    cy.wait(1000);

    cy.get(selectors.EMAIL_FIELD).focus().clear().type(testCredentials.email);
    cy.get(selectors.PASSWORD_FIELD).focus().clear().type(testCredentials.password);
    cy.get(selectors.LOGIN_SUBMIT_BUTTON).click();
    cy.wait(500);
    cy.url();
    expect(cy.url().should('eq', loginPageTexts.dashboardPageUrl));
  });
});
