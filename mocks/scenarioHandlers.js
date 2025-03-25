import { http, HttpResponse } from 'msw';

/**
 * Each property is a scenario name, mapped to an array of MSW handlers.
 */
export const scenarioHandlers = {
  createProductFailure: [
    http.post('https://dummyjson.com/products/add', () => {
      return HttpResponse.json(
        { error: 'Failed to create product' },
        { status: 400 }
      );
    }),
  ],
  // define any number of named scenarios here...
};