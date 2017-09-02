import {oneOrNone} from './dbHelpers';

export const get = async (db, id) => oneOrNone(db.query(`
SELECT * FROM lobbies where id=$1
`, [id]));
