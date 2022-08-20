import { useEffect, useState } from "react";
import MusicManager from "../../lib/music-manager";
import { useStoreMusic, useStoreMusicTime } from "../../store/store-music";
import TimeSlider from "../TimeSlider";

export type MusicCardTimeProps = {
  id: string;
  duration: number;
  onChangeOndemandTime(time: number): void;
};

export default function MusicCardTime(props: MusicCardTimeProps) {
  // States
  const [stateTime, setStateTime] = useState(0);

  // Events
  function onTimeChange(time: number) {
    if (MusicManager.checkId(props.id)) {
      MusicManager.seek(time);
    } else {
      props.onChangeOndemandTime(time);
    }
  }

  // Life
  useEffect(() => {
    let unsubSide: (() => void) | null = null;
    function check() {
      if (MusicManager.checkId(props.id)) {
        unsubSide?.();
        unsubSide = useStoreMusicTime.subscribe((state) => {
          setStateTime(state.time!);
        });
        setStateTime(useStoreMusicTime.getState().time!);
      } else {
        unsubSide?.();
        unsubSide = null;
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
    <TimeSlider
      time={stateTime}
      duration={props.duration}
      onTimeChange={onTimeChange}
      className="flex-grow"
    ></TimeSlider>
  );
}
