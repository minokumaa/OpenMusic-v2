const PlaylistSongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistsongs',
  version: '1.0.0',
  register: (server, {
    playlistSongsService, playlistsService, activitiesService, validator,
  }) => {
    const playlistSongsHandler = new PlaylistSongsHandler(
      playlistSongsService,
      playlistsService,
      activitiesService,
      validator,
    );
    server.route(routes(playlistSongsHandler));
  },
};