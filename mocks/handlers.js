import { http, HttpResponse } from 'msw';

/**
 * these are the DEFAULT handlers that always get loaded with setupServer(...handlers).
 */
export const defaultHandlers = [
  http.post('https://dummyjson.com/products/add', () => {
    return HttpResponse.json({
      id: 'from-mock-api-c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      title: 'This isn\'t a real product',
      price: 1000,
    })
  }),
];
