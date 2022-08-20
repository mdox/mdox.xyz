import create from "zustand";

export type StoreScrollInfoItem = { top: number; height: number };

export type StoreScrollInfoProps = {
  items: Record<string, StoreScrollInfoItem>;
};

export const useStoreScrollInfo = create<StoreScrollInfoProps>(() => ({
  items: {},
}));

export function setScrollInfoItem(key: string, value: StoreScrollInfoItem) {
  useStoreScrollInfo.getState().items[key] = value;
}

export function getScrollInfoItem(key: string) {
  return useStoreScrollInfo.getState().items[key];
}
