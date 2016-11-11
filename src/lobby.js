export async function create(db, {
  type, duration, playerCnt
}) {
  console.log(db);
}

export const get = async (db, id) => db.one(`
SELECT * FROM lobbies where id=$1
`, [id]);
