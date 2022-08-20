import Link from "next/link";
import { mainLinks, sideLinks } from "../../lib/links";
import {
  hideLayoutMenu,
  useStoreShowLayoutMenu,
} from "../../store/store-show-layout-menu";
import Modal from "../Modal";

export default function LayoutMenu() {
  // Stores
  const storeShowLayoutMenu = useStoreShowLayoutMenu();

  // Renders
  return storeShowLayoutMenu.isShow ? (
    <Modal allowEscapeClose onEscapeClose={hideLayoutMenu}>
      <div
        className="fixed inset-0 bg-dark bg-opacity-25"
        onClick={hideLayoutMenu}
      >
        <nav className="ml-auto flex h-full w-48 flex-col gap-2 bg-frame">
          <ul className="flex flex-col">
            {mainLinks.map((link) => (
              <li key={link.path}>
                <Link href={link.path}>
                  <a className="flex h-full items-center bg-dark px-3 py-2 text-lg text-lite hover:bg-lite hover:text-dark">
                    {link.text}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col">
            {sideLinks.map((link) => (
              <li key={link.path}>
                <Link href={link.path}>
                  <a className="flex h-full items-center bg-dark px-3 py-2 text-lg text-lite hover:bg-lite hover:text-dark">
                    {link.text}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Modal>
  ) : null;
}
