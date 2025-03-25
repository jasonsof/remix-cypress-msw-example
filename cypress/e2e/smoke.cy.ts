describe('Submitting the form', () => {
  beforeEach(() => {
    cy.request('POST', '/msw/reset');
  });

  it('Redirects to the success page on success', () => {
    cy.visit('/');

    cy.get('input[name="title"]').type('Lilo Pelekai');
    cy.get('input[type="submit"]').click();

    cy.url().should('include', '/success');

    cy.get('[data-test-id="productId"]')
      .should('have.text', 'from-mock-api-c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d');
  });

  it('Shows an error message on failure', () => {
    cy.request('POST', '/msw/override', { scenario: 'createProductFailure' });

    cy.visit('/');

    cy.get('input[name="title"]').type('Lilo Pelekai');
    cy.get('input[type="submit"]').click();

    cy.url().should('include', '/errorPage');
    cy.get('h1').should('have.text', 'Error');
  });
});
