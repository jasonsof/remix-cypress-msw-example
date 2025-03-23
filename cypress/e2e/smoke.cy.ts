describe('Submitting the form', () => {
  it('Redirects to the OtherPage on success', () => {
    cy.visit('/');

    cy.get('input[name="name"]').type('Lilo Pelekai');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[type="submit"]').click();

    cy.url().should('include', '/otherPage');
  });
});
