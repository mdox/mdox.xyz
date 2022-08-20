import { mdiPause, mdiPlay } from "@mdi/js";
import { MutableRefObject, useEffect, useState } from "react";
import MusicManager from "../../lib/music-manager";
import { useStoreMusic, useStoreMusicPlay } from "../../store/store-music";
import Button from "../Button";
import Icon from "../Icon";

export type MusicCardPlayProps = {
  id: string;
  refOndemandTime: MutableRefObject<number>;
};

export default function MusicCardPlay(props: MusicCardPlayProps) {
  // States
  const [stateIsPlaying, setStateIsPlaying] = useState(false);

  // Events
  function onPlay() {
    if (MusicManager.checkId(props.id)) {
      MusicManager.toggle();
    } else {
      MusicManager.playNew(props.id, props.refOndemandTime.current);
      props.refOndemandTime.current = 0;
    }
  }

  // Life
  useEffect(() => {
    let unsubSide: (() => void) | null = null;
    function check() {
      if (MusicManager.checkId(props.id)) {
        unsubSide = useStoreMusicPlay.subscribe((state) => {
          setStateIsPlaying(state.isPlaying!);
        });
        setStateIsPlaying(useStoreMusicPlay.getState().isPlaying!);
      } else {
        unsubSide?.();
        setStateIsPlaying(false);
      }
    }
    check();
    const unsubMain = useStoreMusic.subscribe(check);
    return () => {
      unsubSide?.();
      unsubMain();
    };
  }, []);

  // Renders
  return (
    <Button isDark isIconSized isFullyRounded isThin onClick={onPlay}>
      <Icon path={stateIsPlaying ? mdiPause : mdiPlay}></Icon>
    </Button>
  );
}
