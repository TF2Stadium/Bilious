export const STATE = {
  WAITING_FOR_PLAYERS: 1,
};

export const TYPE = {
  MGE_1v1: 1,
};

export const create = async (db, {
  mode, map,
}) => {


  await db.none(`
INSERT INTO tournaments (
  type, map_name, region_code, region_name, steam_group, twitch_channel,
  twitch_restriction, serveme_id, server_info_id, created_by_steam_id,
  whitelist, region_lock
) VALUES (
  $1, $2
);
`, [mode, map]);
};

export const get = async (db, id) => db.one(`
SELECT * FROM tournaments WHERE id=$1
`, [id]);
