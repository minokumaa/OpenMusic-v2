class PlaylistSongActivitiesHandler {
  constructor(playlistsService, activitiesService) {
    this._playlistsService = playlistsService;
    this._activitiesService = activitiesService;
  
    this.getPlaylistActivitiesHandler = this.getPlaylistActivitiesHandler.bind(this);
  }
  
  async getPlaylistActivitiesHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
  
    await this._playlistsService.verifyPlaylistOwner(id, credentialId);
    const { playlistId, activities } = await this._activitiesService.getPlaylistSongActivities(id);
  
    const response = h.response({
      status: 'success',
      data: {
        playlistId,
        activities,
      },
    });
    response.code(200);
    return response;
  }
}
  
module.exports = PlaylistSongActivitiesHandler;