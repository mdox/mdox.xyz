import { ReactNode, useEffect, useMemo, useRef } from "react";
import { useShortcuts } from "../lib/shortcut";
import {
  decreaseModalsCount,
  increaseModalsCount,
} from "../store/store-modals-count";
import Portal from "./Portal";

export type ModalProps = {
  children: ReactNode;
  allowEscapeClose?: boolean;
  onEscapeClose?: () => void;
};

export default function Modal(props: ModalProps) {
  // Refs
  const refOnEscapeClose = useRef(props.onEscapeClose);

  refOnEscapeClose.current = props.onEscapeClose;

  // Shortcuts
  useShortcuts(
    useMemo(() => {
      return props.allowEscapeClose
        ? [
            {
              key: "Escape",
              handler: () => {
                refOnEscapeClose.current?.();
              },
            },
          ]
        : [];
    }, [props.allowEscapeClose])
  );

  // Life
  useEffect(() => {
    increaseModalsCount();
    return () => {
      decreaseModalsCount();
    };
  }, []);

  // Renders
  return <Portal>{props.children}</Portal>;
}
