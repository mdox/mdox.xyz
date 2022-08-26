import { mdiArrowLeft, mdiArrowRight, mdiMagnify } from "@mdi/js";
import Link from "next/link";
import { useRef, useState } from "react";
import { GalleryPost, ImagePost } from "../lib/post-types";
import Button from "./Button";
import Icon from "./Icon";
import ImageViewer from "./ImageViewer";
import Modal from "./Modal";
import { ResponsiveImage } from "./ResponsiveImage";
import Show from "./Show";

interface Props extends GalleryPost {}

type GalleryCardImagesProps = {
  title: string;
  images: ImagePost[];
};

type GalleryCardImageProps = {
  title: string;
  image: ImagePost;
};

type GalleryCardDetailsProps = {
  id: string;
  title: string;
  description: string;
  date: string;
};

function GalleryCardImages(props: GalleryCardImagesProps) {
  // States
  const [stateIndex, setStateIndex] = useState(0);
  const [stateShowButtons, setStateShowButtons] = useState(true);
  const [stateIsShowImageViewer, setStateIsShowImageViewer] = useState(false);

  // Refs
  const refHideButtonsStart = useRef(0);

  // Events
  function onMagnify() {
    setStateIsShowImageViewer(true);
  }

  function onPrev() {
    setStateIndex(Math.max(0, stateIndex - 1));
  }

  function onNext() {
    setStateIndex(Math.min(props.images.length - 1, stateIndex + 1));
  }

  function onStartHideButtons() {
    refHideButtonsStart.current = performance.now();
  }

  function onToggleButtons() {
    if (performance.now() - refHideButtonsStart.current < 300) {
      setStateShowButtons(!stateShowButtons);
    }
  }

  return (
    <>
      <div
        className="relative flex max-h-[70vh] items-center justify-center bg-stone-900"
        onMouseDown={onStartHideButtons}
        onTouchStart={onStartHideButtons}
        onClick={onToggleButtons}
      >
        <div className="flex w-full child:h-auto child:max-h-[70vh] child:w-auto child:max-w-full child:object-contain">
          <GalleryCardImage
            title={props.title}
            image={props.images[stateIndex]}
          />
        </div>

        <Show when={stateShowButtons}>
          <Show when={props.images.length > 1}>
            <Button
              isIconSized
              isThin
              isFullyRounded
              isStopPropagation
              className="absolute -translate-y-1/2 left-2 top-1/2"
              onClick={onPrev}
            >
              <Icon path={mdiArrowLeft}></Icon>
            </Button>
            <Button
              isIconSized
              isThin
              isFullyRounded
              isStopPropagation
              className="absolute -translate-y-1/2 right-2 top-1/2"
              onClick={onNext}
            >
              <Icon path={mdiArrowRight}></Icon>
            </Button>
          </Show>
          <Button
            isIconSized
            isThin
            isFullyRounded
            isStopPropagation
            className="absolute -translate-x-1/2 left-1/2 bottom-2"
            onClick={onMagnify}
          >
            <Icon path={mdiMagnify}></Icon>
          </Button>
        </Show>
      </div>

      <Show when={stateIsShowImageViewer}>
        <Modal
          allowEscapeClose
          onEscapeClose={() => setStateIsShowImageViewer(false)}
        >
          <ImageViewer
            imageUrls={props.images.map((item) => item.imagePath)}
            startIndex={stateIndex}
            onClose={() => setStateIsShowImageViewer(false)}
          ></ImageViewer>
        </Modal>
      </Show>
    </>
  );
}

function GalleryCardImage(props: GalleryCardImageProps) {
  return (
    <ResponsiveImage
      src={props.image.imagePath}
      alt={props.title}
      width={props.image.imageWidth}
      height={props.image.imageHeight}
      className="h-auto max-h-[70vh] w-auto max-w-full object-contain"
    />
  );
}

function GalleryCardDetails(props: GalleryCardDetailsProps) {
  return (
    <div className="flex flex-col flex-grow gap-2 p-2">
      <h2>
        <Link href={`/gallery/${props.id}`}>
          <a>{props.title}</a>
        </Link>
      </h2>
      <p className="flex-grow whitespace-pre-wrap">{props.description}</p>
      <span className="self-end text-sm">{props.date}</span>
    </div>
  );
}

export default function GalleryCard(props: Props) {
  // Renders
  return (
    <div className="flex flex-col gap-2 bg-frame">
      <GalleryCardImages title={props.title} images={props.images} />
      <GalleryCardDetails
        id={props.id}
        title={props.title}
        description={props.description}
        date={props.date}
      />
    </div>
  );
}
