import pg from './pg';
import {postgres as postgresConfig} from './env';

const db = pg(postgresConfig);
export const connect = () => db.connect();
