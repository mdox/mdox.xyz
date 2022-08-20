import { ReactNode } from "react";
import LayoutContent from "./LayoutContent";
import LayoutHeader from "./LayoutHeader";
import LayoutMenu from "./LayoutMenu";
import LayoutPlay from "./LayoutPlay";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout(props: LayoutProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-screen-lg flex-col print:mx-0 print:min-h-0 print:max-w-none">
      <div className="mb-auto flex flex-col-reverse">
        <LayoutContent>{props.children}</LayoutContent>
        <div className="h-2 w-full" />
        <LayoutHeader></LayoutHeader>
      </div>
      <LayoutPlay></LayoutPlay>
      <LayoutMenu></LayoutMenu>
    </div>
  );
}
