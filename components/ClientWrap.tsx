import { isValidElement, ReactNode, useEffect, useState } from "react";

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

  return stateIsMounted ? (
    isValidElement(props.children) ? (
      props.children
    ) : (
      <>{props.children}</>
    )
  ) : null;
}
