import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

export type SliderProps = {
  min?: number;
  max?: number;
  value?: number;
  className?: string;
  onSlideEnd?(value: number): void;
  onSlideCancel?(value: number): void;
  onSlideStart?(value: number): void;
  onSlide?(value: number): void;
};

export default function Slider(props: SliderProps) {
  // Refs
  const refInner = useRef<HTMLDivElement>(null);
  const refBound = useRef<DOMRect>();
  const refDrag = useRef<HTMLDivElement>(null);
  const refLine = useRef<HTMLDivElement>(null);
  const refDragging = useRef(false);
  const refShift = useRef(0);
  const refStartTime = useRef(0);
  const refMoved = useRef(false);
  const refValue = useRef(0);

  const refOnSlideEnd = useRef(props.onSlideEnd);
  const refOnSlideCancel = useRef(props.onSlideCancel);
  const refOnSlideStart = useRef(props.onSlideStart);
  const refOnSlide = useRef(props.onSlide);

  refOnSlideEnd.current = props.onSlideEnd;
  refOnSlideCancel.current = props.onSlideCancel;
  refOnSlideStart.current = props.onSlideStart;
  refOnSlide.current = props.onSlide;

  // Methods
  function setRefValueAndUpdate(value: number) {
    refValue.current = value;
    const cssPercent = getCSSPercent();
    refDrag.current!.style.left = cssPercent;
    refLine.current!.style.flexBasis = cssPercent;
  }

  function getCSSPercent() {
    return `${
      ((refValue.current - (props.min ?? 0)) /
        ((props.max ?? 0) - (props.min ?? 0))) *
      100
    }%`;
  }

  function calcValueByPosition(position: number) {
    return (
      (props.min ?? 0) +
      ((props.max ?? 0) - (props.min ?? 0)) *
        Math.max(
          0,
          Math.min(
            1,
            (position - refBound.current!.x - refShift.current) /
              refBound.current!.width
          )
        )
    );
  }

  function calcShiftByPosition(position: number) {
    const rect = refDrag.current!.getBoundingClientRect();
    const diff = position - rect.x;
    return diff > 0 && diff < rect.width ? diff : rect.width / 2;
  }

  function addListeners() {
    globalThis.addEventListener("mouseup", onMouseUp);
    globalThis.addEventListener("mousemove", onMouseMove);
    globalThis.addEventListener("touchend", onTouchEnd);
    globalThis.addEventListener("touchcancel", onTouchCancel);
    globalThis.addEventListener("touchmove", onTouchMove, { passive: false });
    globalThis.addEventListener("keydown", onKeyDown);
    globalThis.addEventListener("contextmenu", onContextMenu);
  }

  function removeListeners() {
    globalThis.removeEventListener("mouseup", onMouseUp);
    globalThis.removeEventListener("mousemove", onMouseMove);
    globalThis.removeEventListener("touchend", onTouchEnd);
    globalThis.removeEventListener("touchcancel", onTouchCancel);
    globalThis.removeEventListener("touchmove", onTouchMove);
    globalThis.removeEventListener("keydown", onKeyDown);
    globalThis.removeEventListener("contextmenu", onContextMenu);
  }

  function end() {
    refDragging.current = false;

    removeListeners();

    if (refMoved.current) {
      refOnSlideEnd.current?.(refValue.current);
    } else {
      if (globalThis.performance.now() - refStartTime.current < 300) {
        refOnSlideEnd.current?.(refValue.current);
      } else {
        cancel();
      }
    }
  }

  function cancel() {
    refDragging.current = false;

    removeListeners();

    setRefValueAndUpdate(props.value ?? 0);
    refOnSlideCancel.current?.(refValue.current);
  }

  function start(position: number) {
    if (refDragging.current) return;

    refMoved.current = false;
    refDragging.current = true;
    refStartTime.current = globalThis.performance.now();
    refBound.current = refInner.current!.getBoundingClientRect();
    refShift.current = calcShiftByPosition(position);

    setRefValueAndUpdate(calcValueByPosition(position));
    addListeners();
    refOnSlideStart.current?.(refValue.current);
  }

  function move(position: number) {
    refMoved.current = true;

    setRefValueAndUpdate(calcValueByPosition(position));
    refOnSlide.current?.(refValue.current);
  }

  // Events
  function onDragStart(e: React.DragEvent) {
    e.preventDefault();
  }

  function onContextMenu(e: React.SyntheticEvent | globalThis.Event) {
    if (!refDragging.current) return;
    e.preventDefault();
    cancel();
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      cancel();
    }
  }

  function onTouchEnd() {
    end();
  }

  function onTouchCancel() {
    cancel();
  }

  function onTouchStart(e: React.TouchEvent) {
    start(e.touches[0].clientX);
  }

  function onTouchMove(e: TouchEvent) {
    e.preventDefault();
    move(e.touches[0].clientX);
  }

  function onMouseUp() {
    end();
  }

  function onMouseDown(e: React.MouseEvent) {
    if (e.buttons !== 1) return;
    start(e.clientX);
  }

  function onMouseMove(e: MouseEvent) {
    move(e.clientX);
  }

  // Effects
  useEffect(() => {
    if (refDragging.current) return;
    setRefValueAndUpdate(props.value ?? 0);
  }, [props.value]);

  useEffect(() => {
    if (refDragging.current) {
      cancel();
    }
  }, []);

  // Renders
  return (
    <div className={twMerge("h-10 select-none", props.className)}>
      <div
        className="relative h-full w-full"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onContextMenu={onContextMenu}
        onDragStart={onDragStart}
      >
        <div className="absolute top-1/2 left-0 right-0 flex h-1 -translate-y-1/2 bg-stone-300 pr-10">
          <div
            ref={refLine}
            style={{ flexBasis: getCSSPercent() }}
            className="bg-stone-900"
          ></div>
        </div>
        <div
          ref={refInner}
          className="absolute top-1/2 left-0 right-10 h-2 -translate-y-1/2"
        >
          <div
            ref={refDrag}
            style={{ left: getCSSPercent() }}
            className="relative h-full w-10 bg-stone-900"
          ></div>
        </div>
      </div>
    </div>
  );
}
