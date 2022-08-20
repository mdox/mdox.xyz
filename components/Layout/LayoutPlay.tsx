import {
  mdiClose,
  mdiFastForward,
  mdiPause,
  mdiPlay,
  mdiRewind,
  mdiSkipNext,
  mdiSkipPrevious,
} from "@mdi/js";
import { useMemo } from "react";
import MusicManager from "../../lib/music-manager";
import {
  useStoreMusic,
  useStoreMusicPlay,
  useStoreMusicTime,
} from "../../store/store-music";
import { useStoreShowLayoutPlay } from "../../store/store-show-layout-play";
import Button from "../Button";
import Icon from "../Icon";
import ShellShortcut from "../ShellShortcut";
import TimeSlider from "../TimeSlider";

export default function LayoutPlay() {
  const storeMusic = useStoreMusic();
  const storeMusicTime = useStoreMusicTime();
  const storeMusicPlay = useStoreMusicPlay();
  const storeShowLayoutPlay = useStoreShowLayoutPlay();

  // Events
  function onNumberSeek(value: number) {
    MusicManager.seek(storeMusic.value!.audioDuration * (value / 10));
  }

  function onToggle() {
    MusicManager.toggle();
  }

  // Shortcuts
  const shortcuts = useMemo(
    () => [
      { key: "ArrowLeft", shift: true, handler: MusicManager.prev },
      { key: "ArrowLeft", handler: () => MusicManager.backward(5) },
      {
        key: "ArrowLeft",
        alt: true,
        handler: () => MusicManager.backward(15),
      },
      { key: " ", handler: onToggle },
      {
        key: "ArrowRight",
        alt: true,
        handler: () => MusicManager.forward(15),
      },
      { key: "ArrowRight", handler: () => MusicManager.forward(5) },
      { key: "ArrowRight", shift: true, handler: MusicManager.next },
      { key: "0", handler: () => onNumberSeek(0) },
      { key: "1", handler: () => onNumberSeek(1) },
      { key: "2", handler: () => onNumberSeek(2) },
      { key: "3", handler: () => onNumberSeek(3) },
      { key: "4", handler: () => onNumberSeek(4) },
      { key: "5", handler: () => onNumberSeek(5) },
      { key: "6", handler: () => onNumberSeek(6) },
      { key: "7", handler: () => onNumberSeek(7) },
      { key: "8", handler: () => onNumberSeek(8) },
      { key: "9", handler: () => onNumberSeek(9) },
    ],
    []
  );

  // Render
  return storeShowLayoutPlay.isShow && storeMusic.value ? (
    <>
      <ShellShortcut shortcuts={shortcuts} />
      <div className="sticky bottom-0 flex flex-col items-center bg-frame p-2">
        <div className="flex w-full flex-col gap-2">
          <a
            href={`/music/${storeMusic.value.id}`}
            className="self-start overflow-hidden overflow-ellipsis text-xl"
          >
            {storeMusic.value.title}
          </a>
          <TimeSlider
            duration={storeMusic.value.audioDuration}
            time={storeMusicTime.time}
            onTimeChange={(time) => MusicManager.seek(time)}
          ></TimeSlider>
        </div>
        <div className="flex items-center gap-2">
          <Button isThin isFullyRounded isDisabled className="h-8 w-8"></Button>
          <Button
            isThin
            isIconSized
            isFullyRounded
            onClick={() => MusicManager.prev()}
          >
            <Icon path={mdiSkipPrevious}></Icon>
          </Button>
          <Button
            isThin
            isIconSized
            isFullyRounded
            onClick={() => MusicManager.backward(5)}
          >
            <Icon path={mdiRewind}></Icon>
          </Button>
          <Button
            isThin
            isIconSized
            isFullyRounded
            isDark
            className="h-12 w-12"
            onClick={onToggle}
          >
            <Icon path={storeMusicPlay.isPlaying ? mdiPause : mdiPlay}></Icon>
          </Button>
          <Button
            isThin
            isIconSized
            isFullyRounded
            onClick={() => MusicManager.forward(5)}
          >
            <Icon path={mdiFastForward}></Icon>
          </Button>
          <Button
            isThin
            isIconSized
            isFullyRounded
            onClick={() => MusicManager.next()}
          >
            <Icon path={mdiSkipNext}></Icon>
          </Button>
          <Button
            isThin
            isFullyRounded
            className="h-8 w-8 bg-danger"
            onClick={() => MusicManager.stop()}
          >
            <Icon path={mdiClose}></Icon>
          </Button>
        </div>
      </div>
    </>
  ) : null;
}
