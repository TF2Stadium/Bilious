export const STATE = {
  WAITING_FOR_PLAYERS: 1,
};

export const TYPE = {
  MGE_1v1: 1,
};

export const create = async (db, {
  type, map, regionCode, steamGroup, twitchChannel,
  twitchRestriction, servemeId, createdBySteamId,
  whitelist, regionLock, server: {host, rconPassword},
}) => {
  return await db.tx(async (t) => {
    const {id: serverId} = await t.one(`
INSERT INTO server_records (host, rcon_password)
VALUES ($1, $2)
RETURNING id;
`, [host, rconPassword]);

    const {id: tournamentId} = await t.one(`
INSERT INTO tournaments (
  type, map_name, region_code, steam_group, twitch_channel,
  twitch_restriction, serveme_id, server_info_id, created_by_steam_id,
  whitelist, region_lock
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
) RETURNING id;
`, [
  type, map, regionCode, steamGroup, twitchChannel,
  twitchRestriction, servemeId, serverId, createdBySteamId,
  whitelist, regionLock,
]);

    return tournamentId;
  });
};

export const get = async (db, id) => db.oneOrNone(`
SELECT * FROM tournaments WHERE id=$1
`, [id]);

export const getActive = async (db) => db.any(`
SELECT * FROM tournaments WHERE state=1
`);
