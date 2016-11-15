export const get = async (db, id) => db.oneOrNone(`
SELECT * FROM lobbies where id=$1
`, [id]);
