# Demo of Remix app with Cypress testing and MSW mocking

This is a very contrived example, but it demonstrates the basic setup.  The app has two pages: / and /success.  The / page has a form action that submits to an external API, https://dummyjson.com/docs/products#products-add.  The /success page is where the user is redirected after the form is successfully submitted, displaying the ID of the newly created product.

## Motivation

This project is a demonstration of how to use mock SSR external API requests with Cypress and MSW.  The goals are:

1. To mock API calls in the node context (SSR) of the app during Cypress tests using MSW.
2. To be able to override the mock handlers with scenario-specific ones during Cypress tests.

## Structure

The default mock handlers are located in `mocks/handlers.js`

The override mock handlers are located in `mocks/scenarioHandlers.js`

The Cypress tests are located in `cypress/e2e/smoke.cy.ts`

A thin Express server is used to allow Cypress to control the mock handlers during the tests.  The server is located in `server.js` and has two endpoints:

1. `/reset` - This endpoint is used by Cypress to reset the mock handlers to the default handlers.
2. `/override` - This endpoint is used by Cypress to override the mock handlers with the scenario-specific mock handlers given in the request body.

## Running the app (with live API calls)

1. Clone the repo
2. Run `npm install`
3. Run `npm run dev`
4. Open your browser to `http://localhost:3000`

## Running the Cypress tests (with MSW mocking)

1. Run `npm run test:e2e`
