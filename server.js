/* eslint-env node */

import express from 'express';
import { createRequestHandler } from '@remix-run/express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { server } from './mocks/node.js';

if (process.env.NODE_ENV === "test") {
  server.listen();
  console.info("🔶 MSW (in-process) mock server running");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
