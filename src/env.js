import {compose, propOr} from 'ramda';

const strEnv = (name, def) =>
    propOr(propOr(def, name, process.env), `BILIOUS_${name}`, process.env),
  int = s => parseInt(s, 10),
  intEnv = compose(int, strEnv);

const nodeEnv = strEnv('NODE_ENV', 'development');

export const port = intEnv('PORT', 8080),
         isProd = nodeEnv === 'production',
         isDev = !isProd,
         jwt = {
           issuer: strEnv('JWT_ISSUER', 'http://localhost'),
           secret: strEnv('JWT_SECRET', 'AAAAAAAAA'),
         },
         postgres = {
           host: strEnv('PG_HOST', 'localhost'),
           port: intEnv('PG_PORT', 5432),
           database: strEnv('PG_DB', 'bilious'),
           user: strEnv('PG_USER', 'admin'),
           password: strEnv('PG_PASSWORD', ''),
         };
