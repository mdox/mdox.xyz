import create from "zustand";

export type StoreIsClientProps = {
  isClient: boolean;
};

export const useStoreIsClient = create<StoreIsClientProps>(() => ({
  isClient: false,
}));

export function setIsClient() {
  useStoreIsClient.setState({ isClient: true });
}

export function setIsNotClient() {
  useStoreIsClient.setState({ isClient: false });
}
