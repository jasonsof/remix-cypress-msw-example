/* eslint-env node */

import express from 'express';
import { createRequestHandler } from '@remix-run/express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const handlers = [
  http.post('https://dummyjson.com/test', () => {
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),
]

if(process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  console.log('Starting MSW server');

  const mockServer = setupServer(...handlers);
  mockServer.listen();
}

// Import the build
import * as build from './build/server/index.js';

const app = express();

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the build output folder
app.use(express.static(path.join(__dirname, 'build/client')));

app.all(
  '*',
  createRequestHandler({
    getLoadContext() {
      return {};
    },
    build,
  })
);

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
app.listen(port, () => {
  console.log(`✅ app ready: http://${host}:${port}`);
});
