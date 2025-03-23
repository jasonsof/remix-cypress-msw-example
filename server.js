/* eslint-env node */

import express from 'express';
import { createRequestHandler } from '@remix-run/express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the build
import * as build from './build/server/index.js';

const app = express();

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

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
