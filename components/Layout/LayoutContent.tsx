import { ReactNode } from "react";

export type LayoutContentProps = {
  children: ReactNode;
};

export default function LayoutContent(props: LayoutContentProps) {
  return <main className="grid px-2 print:px-0">{props.children}</main>;
}
