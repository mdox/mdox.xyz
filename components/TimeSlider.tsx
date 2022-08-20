import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Slider from "./Slider";

export type TimeSliderProps = {
  duration?: number;
  time?: number;
  className?: string;
  onTimeChange?(time: number): void;
};

export default function TimeSlider(props: TimeSliderProps) {
  // States
  const [stateTime, setStateTime] = useState(props.time ?? 0);

  // Refs
  const refDragging = useRef(false);

  // Methods
  function formatTime(time: number) {
    const seconds = time % 60 | 0;
    const minutes = (time / 60) | 0;
    const hours = (time / 3600) | 0;

    return [...(hours ? [hours] : []), ...[minutes, seconds]]
      .map((v) => ("0" + v).slice(-2))
      .join(":");
  }

  // Events
  function onSlideEnd(value: number) {
    refDragging.current = false;
    setStateTime(value);
    props.onTimeChange?.(value);
  }

  function onSlideCancel() {
    refDragging.current = false;
    setStateTime(props.time ?? 0);
  }

  function onSlideStart(value: number) {
    refDragging.current = true;
    setStateTime(value);
  }

  function onSlide(value: number) {
    setStateTime(value);
  }

  // Effects
  useEffect(() => {
    if (refDragging.current) return;
    setStateTime(props.time ?? 0);
  }, [props.time]);

  // Renders
  return (
    <div className={twMerge("flex flex-col", props.className)}>
      <div className="flex justify-between text-sm">
        <span>{formatTime(stateTime)}</span>
        <span>{formatTime(props.duration ?? 0)}</span>
      </div>
      <Slider
        max={props.duration}
        value={stateTime}
        className="h-6"
        onSlideEnd={onSlideEnd}
        onSlideCancel={onSlideCancel}
        onSlideStart={onSlideStart}
        onSlide={onSlide}
      ></Slider>
    </div>
  );
}
