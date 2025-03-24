import { server } from '../../mocks/node';

//   This results in the following error:
//
//   Module not found: Error: Package path ./node is not exported from package /Users/jasonsofokleous/Development/remix-cypress-msw-example/node_modules/msw (see exports field in /Users/jasonsofokleous/Development/remix-cypress-msw-example/node_modules/msw/package.json)
//
afterEach(() => {
  server.resetHandlers()
});

describe('Submitting the form', () => {
  it('Redirects to the success page on success', () => {
    cy.visit('/');

    cy.get('input[name="title"]').type('Lilo Pelekai');
    cy.get('input[type="submit"]').click();

    cy.url().should('include', '/success');

    cy.get('[data-test-id="productId"]')
      .should('have.text', 'from-mock-api-c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d');
  });
});
