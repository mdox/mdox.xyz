import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  imagePath: string;
  className?: string;
}

const maxScale = 6;
const minScale = 1;

export default function ImageZoomer(props: Props) {
  // Refs
  const refTransform = useRef("");
  const refFrame = useRef<HTMLDivElement>(null);
  const refInner = useRef<HTMLDivElement>(null);
  const refCurrX = useRef(0);
  const refCurrY = useRef(0);
  const refCurrScale = useRef(1);
  const refResetPointer = useRef(false);
  const refCurrPointerX = useRef(0);
  const refCurrPointerY = useRef(0);
  const refStartDistance = useRef(0);
  const refStartScale = useRef(1);

  // Methods
  function reset() {
    refCurrX.current = 0;
    refCurrY.current = 0;
    refCurrScale.current = 1;
    refResetPointer.current = false;
    refCurrPointerX.current = 0;
    refCurrPointerY.current = 0;
    refStartDistance.current = 0;
    refStartScale.current = 1;

    updateTransformAndUpdateDOMs();
  }

  function updateTransformAndUpdateDOMs() {
    if (!refInner.current) return;
    refTransform.current = `translate(${refCurrX.current}px, ${refCurrY.current}px) scale(${refCurrScale.current})`;
    refInner.current.style.transform = refTransform.current;
  }

  function zoom(relX: number, relY: number, scale: number) {
    const targetX = (relX - refCurrX.current) / refCurrScale.current;
    const targetY = (relY - refCurrY.current) / refCurrScale.current;

    refCurrScale.current = clampScale(scale);

    move(
      -targetX * refCurrScale.current + relX,
      -targetY * refCurrScale.current + relY
    );
  }

  function move(relX: number, relY: number) {
    refCurrX.current = clampX(relX);
    refCurrY.current = clampY(relY);
  }

  function clampScale(scale: number) {
    return Math.min(maxScale, Math.max(minScale, scale));
  }

  function clampX(x: number) {
    const s = refCurrScale.current;
    const max = refFrame.current!.offsetWidth;
    if (x > 0) return 0;
    if (x + max * s < max) return -max * (s - 1);
    return x;
  }

  function clampY(y: number) {
    const s = refCurrScale.current;
    const max = refFrame.current!.offsetHeight;
    if (y > 0) return 0;
    if (y + max * s < max) return -max * (s - 1);
    return y;
  }

  // Events
  function onTouchMove(e: TouchEvent) {
    e.preventDefault();

    for (var i = 0; i < e.touches.length; ++i)
      if (e.touches[i].identifier > 2) return;

    if (e.touches.length === 1) {
      const pointerX = e.touches[0].clientX - refFrame.current!.offsetLeft;
      const pointerY = e.touches[0].clientY - refFrame.current!.offsetLeft;

      if (refResetPointer.current) {
        refCurrPointerX.current = pointerX;
        refCurrPointerY.current = pointerY;
        refResetPointer.current = false;
        return;
      }

      const movementX = pointerX - refCurrPointerX.current;
      const movementY = pointerY - refCurrPointerY.current;

      refCurrPointerX.current = pointerX;
      refCurrPointerY.current = pointerY;

      move(refCurrX.current + movementX, refCurrY.current + movementY);

      updateTransformAndUpdateDOMs();
    }

    if (e.touches.length === 2) {
      refResetPointer.current = true;

      const pointerX0 = e.touches[0].clientX - refFrame.current!.offsetLeft;
      const pointerY0 = e.touches[0].clientY - refFrame.current!.offsetLeft;
      const pointerX1 = e.touches[1].clientX - refFrame.current!.offsetLeft;
      const pointerY1 = e.touches[1].clientY - refFrame.current!.offsetLeft;

      const distance = Math.hypot(pointerX0 - pointerX1, pointerY0 - pointerY1);

      const distanceScale = distance / refStartDistance.current;

      const scale =
        refStartScale.current +
        (distanceScale > 1
          ? distanceScale - 1
          : -(1 - distanceScale) * maxScale);

      const pointerX = (pointerX0 + pointerX1) / 2;
      const pointerY = (pointerY0 + pointerY1) / 2;

      zoom(pointerX, pointerY, scale);

      move(
        refCurrX.current + (pointerX - refCurrPointerX.current),
        refCurrY.current + (pointerY - refCurrPointerY.current)
      );

      refCurrPointerX.current = pointerX;
      refCurrPointerY.current = pointerY;

      updateTransformAndUpdateDOMs();
    }
  }

  function onTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 1) {
      refResetPointer.current = false;

      const pointerX = e.touches[0].clientX - refFrame.current!.offsetLeft;
      const pointerY = e.touches[0].clientY - refFrame.current!.offsetLeft;

      refCurrPointerX.current = pointerX;
      refCurrPointerY.current = pointerY;
    }

    if (e.touches.length === 2) {
      refResetPointer.current = true;

      const pointerX0 = e.touches[0].clientX - refFrame.current!.offsetLeft;
      const pointerY0 = e.touches[0].clientY - refFrame.current!.offsetLeft;
      const pointerX1 = e.touches[1].clientX - refFrame.current!.offsetLeft;
      const pointerY1 = e.touches[1].clientY - refFrame.current!.offsetLeft;

      const pointerX = (pointerX0 + pointerX1) / 2;
      const pointerY = (pointerY0 + pointerY1) / 2;

      refCurrPointerX.current = pointerX;
      refCurrPointerY.current = pointerY;

      const distance = Math.hypot(pointerX0 - pointerX1, pointerY0 - pointerY1);

      refStartDistance.current = distance;

      refStartScale.current = refCurrScale.current;
    }
  }

  function onMouseMove(e: React.MouseEvent) {
    if (e.buttons !== 1) return;
    move(refCurrX.current + e.movementX, refCurrY.current + e.movementY);
    updateTransformAndUpdateDOMs();
  }

  function onWheel(e: WheelEvent) {
    e.preventDefault();

    const dir = -Math.max(-1, Math.min(1, e.deltaY));
    const scale = refCurrScale.current + 0.25 * dir;
    const relX = e.clientX - refFrame.current!.offsetLeft;
    const relY = e.clientY - refFrame.current!.offsetTop;

    zoom(relX, relY, scale);
    updateTransformAndUpdateDOMs();
  }

  function onDragStart(e: React.DragEvent) {
    e.preventDefault();
  }

  // Effects
  useEffect(() => {
    reset();
  }, [props.imagePath]);

  // Life
  useEffect(() => {
    if (!refFrame.current) return;
    const notPassive: AddEventListenerOptions = { passive: false };
    refFrame.current.addEventListener("touchmove", onTouchMove, notPassive);
    refFrame.current.addEventListener("wheel", onWheel, notPassive);
    globalThis.screen?.orientation?.addEventListener?.("change", reset);
    return () => {
      if (!refFrame.current) return;
      refFrame.current.removeEventListener("touchmove", onTouchMove);
      refFrame.current.removeEventListener("wheel", onWheel);
      globalThis.screen?.orientation?.removeEventListener?.("change", reset);
    };
  }, []);

  // Renders
  return (
    <div
      ref={refFrame}
      className={twMerge("select-none overflow-hidden", props.className)}
      onTouchStart={onTouchStart}
      onMouseMove={onMouseMove}
      onDragStart={onDragStart}
    >
      <div
        ref={refInner}
        style={{ transform: refTransform.current }}
        className="flex h-full w-full origin-top-left items-center justify-center"
      >
        <img
          src={props.imagePath}
          className="h-auto max-h-full w-auto max-w-full object-contain"
        />
      </div>
    </div>
  );
}
