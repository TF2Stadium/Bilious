CREATE TABLE tournaments (
    id serial,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    state integer default 1 NOT NULL,
    type integer NOT NULL,
    map_name character varying(255) NOT NULL,
    region_code character varying(255),
    steam_group character varying(255),
    twitch_channel character varying(255),
    twitch_restriction integer NOT NULL,
    serveme_id integer,
    server_info_id integer NOT NULL,
    created_by_steam_id character varying(255) NOT NULL,
    ready_up_timestamp bigint default NULL,
    match_ended boolean default false NOT NULL,
    whitelist character varying(255) NOT NULL,
    region_lock boolean NOT NULL,
    logstf_id integer
);
