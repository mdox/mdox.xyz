var MediaSessionManager = {
  setMetadata: function (metadata: MediaMetadata | null) {
    if (!navigator.mediaSession) return;
    navigator.mediaSession.metadata = metadata;
  },

  setPlaybackState: function (playbackState: MediaSessionPlaybackState) {
    if (!navigator.mediaSession) return;
    navigator.mediaSession.playbackState = playbackState;
  },

  setActionHandler: function (
    action: MediaSessionAction,
    handler: MediaSessionActionHandler | null
  ) {
    if (!navigator.mediaSession) return;
    navigator.mediaSession.setActionHandler(action, handler);
  },

  setPositionState: function (positionState?: MediaPositionState) {
    if (!navigator.mediaSession) return;
    navigator.mediaSession.setPositionState(positionState);
  },
};

export default MediaSessionManager;
