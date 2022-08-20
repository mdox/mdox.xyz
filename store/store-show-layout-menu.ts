import create from "zustand";

export type StoreShowLayoutMenuProps = {
  isShow: boolean;
};

export const useStoreShowLayoutMenu = create<StoreShowLayoutMenuProps>(() => ({
  isShow: false,
}));

export function showLayoutMenu() {
  useStoreShowLayoutMenu.setState({ isShow: true });
}

export function hideLayoutMenu() {
  useStoreShowLayoutMenu.setState({ isShow: false });
}
