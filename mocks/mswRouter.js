import { Router } from 'express';
import { server } from './node.js';
import { scenarioHandlers } from './scenarioHandlers.js';

export const mswRouter = Router();

mswRouter.use((req, _res, next) => {
  // logging
  // console.log('MSW router got request:', req.path, req.method, req.body);
  next();
});

/**
 * Reset all runtime overrides, restoring the original defaultHandlers array
 * from setupServer(...).
 */
mswRouter.post('/reset', (_req, res) => {
  server.resetHandlers();
  return res.sendStatus(200);
});

/**
 * Dynamically pick a scenario from the request body and override the existing MSW handlers.
 */
mswRouter.post('/override', (req, res) => {
  const { scenario } = req.body;
  if (!scenario) {
    return res.status(400).json({ error: 'Must specify "scenario" in request body' });
  }

  const scenarioToUse = scenarioHandlers[scenario];
  if (!scenarioToUse) {
    return res.status(404).json({ error: `No scenarioHandlers for "${scenario}"` });
  }

  // apply the overrides
  server.use(...scenarioToUse);

  return res.sendStatus(200);
});
