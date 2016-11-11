import express, {Router} from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import createDebug from 'debug';
import cookieParser from 'cookie-parser';
import jwt from 'express-jwt';
import * as env from './env';
import * as lobby from './lobby';
const debug = createDebug('bilious');

// simple wrapper for routes using promises/async/await
const p = routeFn => (req, res, next) => routeFn(req, res, next).catch(next);

export function createServer(db) {
  const server = express();

  server.use(morgan('dev'));
  server.use(bodyParser.json());
  server.use(cookieParser());
  server.use(jwt({
    issuer: env.jwt.issuer,
    secret: new Buffer(env.jwt.secret, 'base64'),
    getToken: req => req.cookies['auth-jwt'],
  }));
  server.use(createRouter(db));

  server.listen(env.port);
  debug(`Listening on ${env.port}`);
}

function createRouter(db) {
  const router = Router({mergeParams: true});

  router.use('/lobby/:id', createLobbyRouter(db));
  router.use((req, res) => res.status(404).send('Not found'));

  return router;
}

function createLobbyRouter(db) {
  const router = Router({mergeParams: true});

  router.get('', p(async ({params: {id}}, res) => res.send(await lobby.get(db, id))));
  router.post('', p(async (req, res) => res.send(await lobby.create(db))));

  return router;
}
