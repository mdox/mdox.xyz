import { isValidElement, ReactNode, useEffect, useState } from "react";
import Show from "./Show";

export type ClientWrapProps = {
  children: ReactNode;
};

export default function ClientWrap(props: ClientWrapProps) {
  const [stateIsMounted, setStateIsMounted] = useState(false);

  useEffect(() => {
    setStateIsMounted(true);
    return () => {
      setStateIsMounted(false);
    };
  }, []);

  return (
    <Show when={stateIsMounted}>
      {isValidElement(props.children) ? props.children : <>{props.children}</>}
    </Show>
  );
}
