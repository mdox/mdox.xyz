import { isValidElement, ReactNode } from "react";
import { useStoreIsClient } from "~/store/store-is-client";
import Show from "./Show";

export type ClientWrapProps = {
  children: ReactNode;
};

export default function ClientWrap(props: ClientWrapProps) {
  const storeIsClient = useStoreIsClient();

  return (
    <Show when={storeIsClient.isClient}>
      {isValidElement(props.children) ? props.children : <>{props.children}</>}
    </Show>
  );
}
