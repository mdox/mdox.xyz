import create from "zustand";

export type StoreIsFullscreenEnabledProps = { isFullscreenEnabled: boolean };
export type StoreIsFullscreenProps = { isFullscreen: boolean };

export const useStoreIsFullscreenEnabled =
  create<StoreIsFullscreenEnabledProps>(() => ({ isFullscreenEnabled: false }));

export const useStoreIsFullscreen = create<StoreIsFullscreenProps>(() => ({
  isFullscreen: false,
}));
