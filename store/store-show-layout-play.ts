import create from "zustand";

export type StoreShowLayoutPlayProps = {
  isShow: boolean;
};

export const useStoreShowLayoutPlay = create<StoreShowLayoutPlayProps>(() => ({
  isShow: false,
}));

export function showLayoutPlay() {
  useStoreShowLayoutPlay.setState({ isShow: true });
}

export function hideLayoutPlay() {
  useStoreShowLayoutPlay.setState({ isShow: false });
}
