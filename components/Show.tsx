import { isValidElement, ReactNode } from "react";

export type ShowProps = {
  when: boolean;
  children: ReactNode;
};

export default function Show(props: ShowProps) {
  return props.when ? (
    isValidElement(props.children) ? (
      props.children
    ) : (
      <>{props.children}</>
    )
  ) : null;
}
