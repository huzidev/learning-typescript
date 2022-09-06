import { selectors, forgotPageTexts, testCredentials } from '../../Pages/ResetPassword';

const goToResetPasswordPage = () => {
  cy.visit('/');
  cy.get(selectors.FORGOT_PASSWORD_PAGE_CTA).click();
  cy.wait(500);
};

describe('Forgot Password Page', () => {
  it('should render Forgot Password page successfully', () => {
    goToResetPasswordPage();
    expect(cy.get(selectors.FORGOT_PASS_CARD_HEADER).contains(forgotPageTexts.forgotPageHeading));
  });

  it('email field should render email required error', () => {
    goToResetPasswordPage();
    cy.get(selectors.EMAIL_FIELD).clear();
    cy.get(selectors.FORGOT_SUBMIT_BUTTON).click();
    expect(cy.get(selectors.ERROR_ALERT).contains(forgotPageTexts.emailRequired));
  });

  it('It should load login page when clicking on login cta', () => {
    goToResetPasswordPage();
    cy.get(selectors.LOGIN_CTA).click();
    expect(cy.get(selectors.LOGIN_CARD_HEADER).contains(forgotPageTexts.loginHeaderText));
  });

  it('It should render an email not exist error when invalid email is submitted', () => {
    goToResetPasswordPage();
    cy.get(selectors.EMAIL_FIELD).focus().clear().type(testCredentials.invalid_email);
    cy.get(selectors.FORGOT_SUBMIT_BUTTON).click();
    cy.wait(500);
    expect(
      cy
        .get(selectors.FORGOT_INVALID_CREDENTIALS_NOTIFICATION)
        .contains(forgotPageTexts.userNotExistText),
    );
  });

  it('should successfullly resets password', () => {
    goToResetPasswordPage();
    cy.get(selectors.EMAIL_FIELD).focus().clear().type(testCredentials.email);
    cy.get(selectors.FORGOT_SUBMIT_BUTTON).click();
    cy.wait(500);
    cy.get(selectors.RESET_PASSWORD).clear().type(testCredentials.password);
    cy.get(selectors.CONFIRM_RESET_PASSWORD).clear().type(testCredentials.password);
    cy.request('POST', 'http://localhost:3333/api/auth/v1/d_codes', {
      query: testCredentials.email,
    }).then((response) => {
      // response.body is automatically serialized into JSON
      const code = response.body.password.code;
      cy.get('.vi__container.code-container').type(code);
      cy.get(selectors.RESET_SUBMIT).click();
      expect(cy.get(selectors.LOGIN_CARD_HEADER).contains(forgotPageTexts.loginHeaderText));
    });
  });
});
