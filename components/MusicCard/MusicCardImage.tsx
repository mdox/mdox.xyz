import Image from "next/image";
import { useState } from "react";
import ImageViewer from "../ImageViewer";
import Modal from "../Modal";

export type MusicCardImageProps = {
  src: string;
  alt: string;
};

export default function MusicCardImage(props: MusicCardImageProps) {
  // States
  const [stateIsShowImageViewer, setStateIsShowImageViewer] = useState(false);

  // Renders
  return (
    <>
      <div
        className="relative h-20 w-20 flex-shrink-0 cursor-pointer lg:h-40 lg:w-40"
        onClick={() => setStateIsShowImageViewer(true)}
      >
        <Image
          src={props.src}
          alt={props.alt}
          width={160}
          height={160}
          quality={100}
          objectFit="cover"
          objectPosition="center"
        ></Image>
      </div>

      {stateIsShowImageViewer ? (
        <Modal
          allowEscapeClose
          onEscapeClose={() => setStateIsShowImageViewer(false)}
        >
          <ImageViewer
            imageUrls={[props.src]}
            onClose={() => setStateIsShowImageViewer(false)}
          ></ImageViewer>
        </Modal>
      ) : null}
    </>
  );
}
