import pgLib from 'pg-promise';

// This is a stateful module to wrap pg-promise's library
// initialization
const pg = pgLib();
export default pg;
export const end = () => pg.end();
