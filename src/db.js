import r from 'rethinkdb';
import {partial} from 'ramda';
import {rethink as rethinkConfig} from './env';

export const connect = partial(r.connect, [rethinkConfig]);
