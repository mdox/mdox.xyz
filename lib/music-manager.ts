import {
  setMusic,
  setMusicPlay,
  setMusicTime,
  useStoreMusic,
  useStoreMusicList,
} from "../store/store-music";
import {
  hideLayoutPlay,
  showLayoutPlay,
} from "../store/store-show-layout-play";
import MediaSessionManager from "./media-session-manager";

var MusicManager = {
  checkId(id: string) {
    return useStoreMusic.getState().value?.id === id;
  },

  queryAudioDOM() {
    return document.getElementById("music-manager-audio")! as HTMLAudioElement;
  },

  destroyAudioDOM() {
    const audioDOM = MusicManager.queryAudioDOM();
    if (!audioDOM) return;
    audioDOM.pause();
    audioDOM.removeEventListener("pause", MusicManager.onPause);
    audioDOM.removeEventListener("ended", MusicManager.onEnded);
    audioDOM.removeEventListener("play", MusicManager.onPlay);
    audioDOM.removeEventListener("timeupdate", MusicManager.onTimeUpdate);
    document.body.removeChild(audioDOM);
  },

  createAudioDOM(src: string, currentTime: number) {
    const audioDOM = document.createElement("audio");
    audioDOM.id = "music-manager-audio";
    audioDOM.src = src;
    audioDOM.currentTime = currentTime;
    audioDOM.hidden = true;
    audioDOM.addEventListener("pause", MusicManager.onPause);
    audioDOM.addEventListener("ended", MusicManager.onEnded);
    audioDOM.addEventListener("play", MusicManager.onPlay);
    audioDOM.addEventListener("timeupdate", MusicManager.onTimeUpdate);
    document.body.appendChild(audioDOM);
  },

  setupMediaSession() {
    MediaSessionManager.setActionHandler("nexttrack", MusicManager.next);
    MediaSessionManager.setActionHandler("pause", MusicManager.pause);
    MediaSessionManager.setActionHandler("play", MusicManager.play);
    MediaSessionManager.setActionHandler("previoustrack", MusicManager.prev);
    MediaSessionManager.setActionHandler("seekbackward", (details) =>
      MusicManager.backward(details.seekOffset ?? 5)
    );
    MediaSessionManager.setActionHandler("seekforward", (details) =>
      MusicManager.forward(details.seekOffset ?? 5)
    );
    MediaSessionManager.setActionHandler("seekto", (details) => {
      details.seekTime && MusicManager.seek(details.seekTime);

      const audioDOM = MusicManager.queryAudioDOM();

      MediaSessionManager.setPositionState({
        playbackRate: 1,
        duration: audioDOM.duration,
        position: details.seekTime ?? audioDOM.currentTime,
      });
    });
    MediaSessionManager.setActionHandler("stop", MusicManager.stop);
  },

  clearMediaSession() {
    MediaSessionManager.setMetadata(null);
    MediaSessionManager.setPositionState();
    MediaSessionManager.setPlaybackState("none");
    MediaSessionManager.setActionHandler("nexttrack", null);
    MediaSessionManager.setActionHandler("pause", null);
    MediaSessionManager.setActionHandler("play", null);
    MediaSessionManager.setActionHandler("previoustrack", null);
    MediaSessionManager.setActionHandler("seekbackward", null);
    MediaSessionManager.setActionHandler("seekforward", null);
    MediaSessionManager.setActionHandler("seekto", null);
    MediaSessionManager.setActionHandler("stop", null);
  },

  onPause() {
    setMusicPlay(false);
    MediaSessionManager.setPlaybackState("paused");
  },

  onEnded() {
    setMusicPlay(false);
    MediaSessionManager.setPlaybackState("paused");
    MusicManager.next();
  },

  onPlay() {
    setMusicPlay(true);
    MediaSessionManager.setPlaybackState("playing");
  },

  onTimeUpdate(e: globalThis.Event) {
    setMusicTime((e.currentTarget as HTMLAudioElement).currentTime);
  },

  prev() {
    const item = useStoreMusic.getState().value;
    const items = useStoreMusicList.getState().items;
    if (!item || !items) return;
    const index = items.findIndex((otherItem) => otherItem.id === item.id);
    MusicManager.playNew(items.slice(index - 1)[0].id, 0);
  },

  backward(by: number) {
    MusicManager.forward(-by);
  },

  stop() {
    // MusicManager.pause();
    setMusicPlay(false);
    setMusic(null);
    MusicManager.destroyAudioDOM();
    hideLayoutPlay();

    MusicManager.clearMediaSession();
  },

  pause() {
    MusicManager.queryAudioDOM().pause();
  },

  play() {
    return MusicManager.queryAudioDOM().play();
  },

  toggle() {
    if (MusicManager.queryAudioDOM().paused) {
      MusicManager.play();
    } else {
      MusicManager.pause();
    }
  },

  async playNew(id: string, time: number) {
    const items = useStoreMusicList.getState().items;
    if (!items) return;
    const item = items.find((item) => item.id === id);
    if (!item) return;

    MusicManager.destroyAudioDOM();
    MusicManager.createAudioDOM(item.audioPath, time);

    setMusic(item);
    setMusicTime(time);
    setMusicPlay(false);

    await MusicManager.play();

    MusicManager.setupMediaSession();

    MediaSessionManager.setPositionState({
      playbackRate: 1,
      duration: MusicManager.queryAudioDOM().duration,
      position: MusicManager.queryAudioDOM().currentTime,
    });

    if (globalThis.MediaMetadata) {
      MediaSessionManager.setMetadata(
        new MediaMetadata({
          artist: "Dresmor Alakazard",
          title: item.title,
          album: "",
          artwork: [
            {
              src: item.imagePath,
              sizes: `${item.imageWidth}x${item.imageHeight}`,
            },
            ...[128, 224, 288, 576, 768].map((width) => ({
              src: `/_next/image?url=${encodeURIComponent(
                item.imagePath
              )}&w=${width}&q=100`,
              sizes: `${width}x${Math.floor(
                item.imageHeight * (width / item.imageWidth)
              )}`,
            })),
          ],
        })
      );
    }

    showLayoutPlay();
  },

  forward(by: number) {
    MusicManager.seek(MusicManager.queryAudioDOM().currentTime + by);
  },

  next() {
    const item = useStoreMusic.getState().value;
    const items = useStoreMusicList.getState().items;

    if (!item || !items) return;
    const index = items.findIndex((otherItem) => otherItem.id === item.id);
    MusicManager.playNew(items.slice((index + 1) % items.length)[0].id, 0);
  },

  seek(to: number) {
    const audioDOM = MusicManager.queryAudioDOM();
    audioDOM.currentTime = Math.max(0, Math.min(audioDOM.duration, to));
  },
};

export default MusicManager;
