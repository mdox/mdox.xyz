import { useEffect, useRef, useState } from "react";
import { imageSizes } from "../lib/image-sizes";

export type ResponsiveImageProps = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  className?: string;
};

export function ResponsiveImage(props: ResponsiveImageProps) {
  // States
  const [stateSrc, setStateSrc] = useState("");
  const [stateWidth, setStateWidth] = useState(0);
  const [stateHeight, setStateHeight] = useState(0);

  // Refs
  const refImage = useRef<HTMLImageElement>(null);
  const refTask = useRef<(() => void) | null>(null);
  const refTaskSrc = useRef("");
  const refIsReady = useRef(true);

  // Events
  function onLoadStart() {
    refIsReady.current = false;
  }

  function onError() {
    refIsReady.current = true;
  }

  function onLoad() {
    if (refTask.current) {
      refIsReady.current = true;
      refTask.current();
      refTask.current = null;
    }
  }

  function onResize() {
    if (!refImage.current) return;
    if (!refImage.current.parentElement) return;

    const maxWidth = refImage.current.parentElement.offsetWidth;
    const scale = Math.min(maxWidth / props.width, maxWidth / props.height);

    setStateWidth(props.width * scale);
    setStateHeight(props.height * scale);

    const requestedWidth = props.width * scale;
    const width = imageSizes.find((size) => size > requestedWidth);

    const url = encodeURIComponent(props.src);
    const src = width ? `/_next/image?url=${url}&w=${width}&q=100` : props.src;

    if (refTaskSrc.current !== src) {
      if (!refIsReady.current) {
        refTask.current = () => setStateSrc(src);
        refTaskSrc.current = src;
      } else {
        setStateSrc(src);
        refTaskSrc.current = src;
      }
    }
  }

  // Life
  useEffect(() => {
    if (!refImage.current) return;
    if (!refImage.current.parentElement) return;

    const observer = new ResizeObserver(onResize);
    observer.observe(refImage.current.parentElement);

    onResize();

    return () => {
      refTask.current = null;
      refTaskSrc.current = "";
      observer.disconnect();
    };
  }, [props.src, props.width, props.height]);

  // Renders
  return (
    <img
      ref={refImage}
      src={stateSrc}
      alt={props.alt}
      style={{
        width: `${stateWidth}px`,
        height: `${stateHeight}px`,
      }}
      loading="lazy"
      className={props.className}
      onLoad={onLoad}
      onAbort={onError}
      onError={onError}
      onLoadStart={onLoadStart}
    />
  );
}
