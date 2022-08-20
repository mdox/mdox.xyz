import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { MusicPost } from "../../lib/post-types";
import MusicCardDetails from "./MusicCardDetails";
import MusicCardImage from "./MusicCardImage";
import MusicCardPlay from "./MusicCardPlay";
import MusicCardTime from "./MusicCardTime";

export type MusicCardProps = MusicPost & {
  className?: string;
};

export default function MusicCard(props: MusicCardProps) {
  // Refs
  const refOndemandTime = useRef(0);

  // Events
  function onChangeOndemandTime(time: number) {
    refOndemandTime.current = time;
  }

  // Renders
  return (
    <div
      className={twMerge("flex flex-col gap-2 bg-frame p-2", props.className)}
    >
      <div className="flex gap-2">
        <MusicCardImage src={props.imagePath} alt={props.title} />
        <MusicCardDetails
          id={props.id}
          title={props.title}
          description={props.description}
          date={props.date}
        />
      </div>
      <div className="flex gap-2">
        <MusicCardPlay id={props.id} refOndemandTime={refOndemandTime} />
        <MusicCardTime
          id={props.id}
          duration={props.audioDuration}
          onChangeOndemandTime={onChangeOndemandTime}
        />
      </div>
    </div>
  );
}
