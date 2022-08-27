import { ReactNode } from "react";
import { createPortal } from "react-dom";
import ClientWrap from "./ClientWrap";

export type PortalProps = {
  children: ReactNode;
};

export default function Portal(props: PortalProps) {
  return (
    <ClientWrap>
      {createPortal(props.children, document.getElementById("portal")!)}
    </ClientWrap>
  );
}
