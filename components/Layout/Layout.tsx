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
    <div className="flex flex-col max-w-screen-lg min-h-screen mx-auto print:mx-0 print:min-h-0 print:max-w-none">
      <div className="flex flex-col-reverse mb-auto">
        <LayoutContent>{props.children}</LayoutContent>
        <div className="w-full h-2" />
        <LayoutHeader></LayoutHeader>
      </div>
      <LayoutPlay></LayoutPlay>
      <LayoutMenu></LayoutMenu>
    </div>
  );
}
