import express from 'express';
import createDebug from 'debug';
import {propOr} from 'ramda';
const debug = createDebug('bilious');

const server = express();

server.use((req, res) => res.send('Hello World'));

const port = parseInt(propOr('80', 'PORT', process.env), 10);
server.listen(port);
debug(`Listening on ${port}`);
