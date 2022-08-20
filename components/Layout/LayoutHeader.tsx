import { mdiMenu } from "@mdi/js";
import Link from "next/link";
import { mainLinks, sideLinks } from "../../lib/links";
import { showLayoutMenu } from "../../store/store-show-layout-menu";
import Button from "../Button";
import Icon from "../Icon";

export default function LayoutHeader() {
  return (
    <header className="sticky top-0 flex justify-between bg-frame print:hidden">
      <Link href="/">
        <a className="bg-dark px-3 py-2 text-3xl text-lite">MDOX</a>
      </Link>
      <Button isDark className="w-11 px-1 lg:hidden" onClick={showLayoutMenu}>
        <Icon path={mdiMenu}></Icon>
      </Button>
      <nav className="hidden gap-2 lg:flex">
        <ul className="flex">
          {mainLinks.map((link) => (
            <li key={link.path}>
              <Link href={link.path}>
                <a className="flex h-full items-center bg-dark px-3 text-lg text-lite hover:bg-lite hover:text-dark">
                  {link.text}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex">
          {sideLinks.map((link) => (
            <li key={link.path}>
              <Link href={link.path}>
                <a className="flex h-full items-center bg-dark px-3 text-lg text-lite hover:bg-lite hover:text-dark">
                  {link.text}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
