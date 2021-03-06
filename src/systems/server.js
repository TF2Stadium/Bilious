import {createService} from 'ineedthis';
import dbService from './db';
import configurationService from './config';
import express, {Router} from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import createDebug from 'debug';
import cookieParser from 'cookie-parser';
import jwt from 'express-jwt';
import * as lobby from '../lobby';
import * as tournament from '../tournament';
const debug = createDebug('bilious');

// simple wrapper for routes using promises/async/await
const p = routeFn => (req, res, next) => routeFn(req, res, next).catch(next);

export default createService('bilious/server', {
  dependencies: [dbService, configurationService],
  start: () => ({
    [dbService.serviceName]: db,
    [configurationService.serviceName]: env,
  }) => createServer(db, env),
});

export function createServer(db, env) {
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

  if (env.isProd) {
    server.use((err, req, res, next) => {
      res.status(403).send('Forbidden');
      next();
    });
  }

  server.listen(env.port);
  debug(`Listening on ${env.port}`);
}

function isAdmin(req, res, next) {
  if (req.user.role === 2) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
}

function createRouter(db) {
  const router = Router({mergeParams: true});

  router.use('/user', ({user}, res) => res.send(user));
  router.use('/lobby/', createLobbyRouter(db));
  router.use('/tournament/', createTournamentRouter(db));
  router.use((req, res) => res.status(404).send('Not found'));

  return router;
}

function createLobbyRouter(db) {
  const router = Router({mergeParams: true}),
    lobbyRouter = Router({mergeParams: true});

  // router.post(''); Create Lobby (Helen does this still)

  router.use('/:id', lobbyRouter);
  lobbyRouter.use(p(async (req, res, next) => {
    const l = await lobby.get(db, req.params.id);
    if (l) {
      req.lobby = l;
      next();
    } else {
      res.status(404).send('Not found');
    }
  }));
  lobbyRouter.get('', ({lobby: l}, res) => res.send(l));

  return router;
}

function createTournamentRouter(db) {
  const router = Router({mergeParams: true}),
    tournamentRouter = Router({mergeParams: true});

  router.post('', isAdmin, p(async ({body}, res) => {
    res.send({id: await tournament.create(db, body)});
  }));

  router.get('', p(
    async ({body}, res) =>
      res.send(await tournament.getActive(db))
  ));

  router.use('/:id', tournamentRouter);
  tournamentRouter.use(p(async (req, res, next) => {
    const l = await tournament.get(db, req.params.id);
    if (l) {
      req.tournament = l;
      next();
    } else {
      res.status(404).send('Not found');
    }
  }));
  tournamentRouter.get('', ({tournament: l}, res) => res.send(l));

  return router;
}
