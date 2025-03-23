describe('Submitting the form', () => {
  it('Redirects to the OtherPage on success', () => {
    cy.visit('/');

    cy.get('input[name="title"]').type('Lilo Pelekai');
    cy.get('input[type="submit"]').click();

    cy.url().should('include', '/otherPage');

    cy.get('[data-test-id="productId"]')
      .should('have.text', 'from-mock-api-c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d');
  });
});
