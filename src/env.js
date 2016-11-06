import {compose, propOr} from 'ramda';

const strEnv = (name, def) => propOr(def, name, process.env),
  int = s => parseInt(s, 10),
  intEnv = compose(int, strEnv);

export const port = intEnv('PORT', 8080),
         rethink = {
           host: strEnv('RETHINKDB_HOST', 'localhost'),
           port: intEnv('RETHINKDB_PORT', 28015),
           db: strEnv('RETHINKDB_DB', 'bilious'),
           user: strEnv('RETHINKDB_USER', 'admin'),
           password: strEnv('RETHINKDB_PASSWORD', ''),
         };
