import express from 'express';
import createDebug from 'debug';
import {port} from './env';
const debug = createDebug('bilious');

export function createServer(db) {
  const server = express();

  server.use((req, res) => res.send('Hello World'));

  server.listen(port);
  debug(`Listening on ${port}`);
}
