import clsx from "clsx";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonProps = {
  isSubmit?: boolean;
  isReset?: boolean;
  isDisabled?: boolean;
  isDark?: boolean;
  isIconSized?: boolean;
  isThin?: boolean;
  isFullyRounded?: boolean;
  isStopPropagation?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?(): void;
};

export default function Button(props: ButtonProps) {
  // Events
  function onClick(e: React.MouseEvent) {
    if (props.isStopPropagation) e.stopPropagation();
    props.onClick?.();
  }

  // Renders
  return (
    <button
      type={props.isSubmit ? "submit" : props.isReset ? "reset" : "button"}
      disabled={props.isDisabled}
      className={twMerge(
        "box-content inline-flex items-center justify-center gap-2",
        clsx(
          props.isDark ? "bg-dark text-lite" : "bg-button text-dark",
          props.isIconSized ? "h-10 w-10" : "",
          props.isThin ? "" : "px-3 py-2",
          props.isFullyRounded ? "rounded-full" : ""
        ),
        props.className
      )}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
}
