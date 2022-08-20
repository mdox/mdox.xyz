import {
  mdiArrowLeft,
  mdiArrowRight,
  mdiClose,
  mdiFullscreen,
  mdiFullscreenExit,
} from "@mdi/js";
import { useRef, useState } from "react";
import { useFullscreen } from "../lib/fullscreen";
import { useShortcuts } from "../lib/shortcut";
import Button from "./Button";
import Icon from "./Icon";
import ImageZoomer from "./ImageZoomer";

interface Props {
  imageUrls: string[];
  startIndex?: number;
  onClose?(): void;
}

export default function ImageViewer(props: Props) {
  // Use Fullscreen
  const { toggleFullscreen, isFullscreen, isFullscreenEnabled } =
    useFullscreen();

  // States
  const [stateShowButtons, setStateShowButtons] = useState(true);
  const [stateIndex, setStateIndex] = useState(props.startIndex ?? 0);

  // Refs
  let refFrame = useRef<HTMLDivElement>(null);
  let refHideButtonsStart = useRef(0);

  // Events
  function onPrev() {
    setStateIndex(Math.max(0, stateIndex - 1));
  }

  function onNext() {
    setStateIndex(Math.min(props.imageUrls.length - 1, stateIndex + 1));
  }

  function onToggleFullscreen() {
    toggleFullscreen(refFrame.current!);
  }

  function onStartHideButtons() {
    refHideButtonsStart.current = performance.now();
  }

  function onToggleButtons() {
    if (performance.now() - refHideButtonsStart.current < 300) {
      setStateShowButtons(!stateShowButtons);
    }
  }

  // Shortcuts
  useShortcuts([
    { key: "f", handler: onToggleFullscreen },
    { key: "f", shift: true, handler: onToggleFullscreen },
    { key: "ArrowLeft", handler: onPrev },
    { key: "ArrowRight", handler: onNext },
  ]);

  // Renders
  return (
    <div
      ref={refFrame}
      className="fixed inset-0 bg-stone-900"
      onMouseDown={onStartHideButtons}
      onTouchStart={onStartHideButtons}
      onClick={onToggleButtons}
    >
      <ImageZoomer
        imagePath={props.imageUrls[stateIndex]}
        className="h-full w-full"
      ></ImageZoomer>
      {stateShowButtons ? (
        <>
          <Button
            isIconSized
            isThin
            isFullyRounded
            isStopPropagation
            className="absolute right-2 top-2 bg-red-500"
            onClick={props.onClose}
          >
            <Icon path={mdiClose}></Icon>
          </Button>
          {props.imageUrls.length > 1 ? (
            <>
              <Button
                isIconSized
                isThin
                isFullyRounded
                isStopPropagation
                className="absolute left-2 top-1/2 -translate-y-1/2"
                onClick={onPrev}
              >
                <Icon path={mdiArrowLeft}></Icon>
              </Button>
              <Button
                isIconSized
                isThin
                isFullyRounded
                isStopPropagation
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={onNext}
              >
                <Icon path={mdiArrowRight}></Icon>
              </Button>
            </>
          ) : null}
          {!isFullscreenEnabled ? null : (
            <Button
              isIconSized
              isThin
              isFullyRounded
              isStopPropagation
              className="absolute left-1/2 bottom-2 -translate-x-1/2"
              onClick={onToggleFullscreen}
            >
              <Icon
                path={isFullscreen ? mdiFullscreenExit : mdiFullscreen}
              ></Icon>
            </Button>
          )}
        </>
      ) : null}
    </div>
  );
}
