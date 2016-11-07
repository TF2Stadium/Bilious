import express, {Router} from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import createDebug from 'debug';
import {port} from './env';
import {createLobby} from './lobby';
const debug = createDebug('bilious');

// simple wrapper for routes that return promises
const p = routeFn => (req, res, next) => routeFn(req, res, next).catch(next);

export function createServer(db) {
  const server = express();

  server.use(morgan('dev'));
  server.use(bodyParser.json());
  server.use(createRouter(db));

  server.listen(port);
  debug(`Listening on ${port}`);
}

function createRouter(db) {
  const router = Router({mergeParams: true});

  router.use('/lobby/:id', createLobbyRouter(db));
  router.use((req, res) => res.send('Not found', 404));

  return router;
}

function createLobbyRouter(db) {
  const router = Router({mergeParams: true});

  router.get('', (req, res) => res.send(`Lobby ${req.params.id}`));
  router.post('', p(async (req, res) => res.send(await createLobby(db))));

  return router;
}
