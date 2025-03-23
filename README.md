# Demo of Remix app with Cypress testing and MSW mocking

This is a very contrived example, but it demonstrates the basic setup.  The app has two pages: / and /success.  The / page has a form action that submits to an external API, https://dummyjson.com/docs/products#products-add.  The /success page is where the user is redirected after the form is successfully submitted, displaying the ID of the newly created product.

The mock handlers are located in `./server.js` (which is the entry point for the app).

The Cypress tests are located in `./cypress/e2e/smoke.cy.ts`

## Running the app (with live API calls)

1. Clone the repo
2. Run `npm install`
3. Run `npm run dev`
4. Open your browser to `http://localhost:3000`

## Running the Cypress tests (with MSW mocking)

1. Run `npm run test:e2e`

## Next steps

- Move the mocking handlers out of server.js and into their own files