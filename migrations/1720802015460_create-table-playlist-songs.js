exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('playlist_songs', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        playlist_id: {
            type: 'VARCHAR(50)',
            notnull: true,
            references: 'playlists',
            onDelete: 'cascade',
        },
        song_id: {
            type: 'VARCHAR(50)',
            notnull: true,
            references: 'songs',
            onDelete: 'cascade',
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('playlist_songs');
};
