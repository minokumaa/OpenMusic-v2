class PlaylistSongsHandler{
    constructor(playlistSongsService, playlistsService, activitiesService, validator){
        this._playlistSongsService = playlistSongsService;
        this._playlistsService = playlistsService;
        this._activitiesService = activitiesService;
        this._validator = validator;

        this.postSongToPlaylistHandler = this.postSongToPlaylistHandler.bind(this);
        this.getSongsInPlaylistHandler = this.getSongsInPlaylistHandler.bind(this);
        this.deleteSongInPlaylistHandler = this.deleteSongInPlaylistHandler.bind(this);
    }

    async postSongToPlaylistHandler(request, h) {
        this._validator.validatePlaylistSongPayload(request.payload);
        const { id } = request.params;
        const { songId } = request.payload;
        const { id: credentialId } = request.auth.credentials;

        this._playlistsService.verifyPlaylistAccess(id, credentialId);
        const songInPlaylistId = await this._playlistSongsService.addSongToPlaylist({ id, songId });

        const action = 'add';
        const time = new Date().toISOString();
        await this._activitiesService.addPlaylistSongActivities(id, {
            songId, credentialId, action, time
        });

        const response = h.response({
            status: 'success',
            message: 'Lagu berhasil ditambahkan ke dalam playlist',
            data: {
                songInPlaylistId,
            },
        });
        response.code(201);
        return response;
    }

    async getSongsInPlaylistHandler(request, h) {
        const { id } = request.params;
        const { id: credentialId } = request.auth.credentials;

        await this._playlistsService.verifyPlaylistAccess(id, credentialId);
        const songs = await this._playlistSongsService.getSongsInPlaylist(id);
        return {
            status: 'success',
            data: {
                songs,
            },
        };
    }

    async deleteSongInPlaylistHandler(request, h) {
        this._validator.validatePlaylistSongPayload(request.payload);
        const { id } = request.params;
        const { songId } = request.payload;
        const { id: credentialId } = request.auth.credentials;

        await this._playlistsService.verifyPlaylistAccess(id, credentialId);
        await this._playlistSongsService.deleteSongInPlaylist(songId);

        const action = 'delete';
        const time = new Date().toISOString();
        await this._activitiesService.addPlaylistSongActivities(id, { 
            songId, credentialId, action, time 
        });

        return {
            status: 'success',
            message: 'Lagu berhasil dihapus dari playlist',
        };
    }
}

module.exports = PlaylistSongsHandler;