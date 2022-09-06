describe('App Initialization', () => {
  it('should visits the app', () => {
    cy.visit('/');
    expect(true).to.equal(true);
  });
});
