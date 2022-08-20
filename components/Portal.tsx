import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type PortalProps = {
  children: ReactNode;
};

export default function Portal(props: PortalProps) {
  const [stateIsMounted, setStateIsMounted] = useState(false);

  useEffect(() => {
    setStateIsMounted(true);
    return () => {
      setStateIsMounted(false);
    };
  }, []);

  return stateIsMounted
    ? createPortal(props.children, document.getElementById("portal")!)
    : null;
}
