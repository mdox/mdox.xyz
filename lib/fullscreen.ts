import { useEffect } from "react";
import {
  useStoreIsFullscreen,
  useStoreIsFullscreenEnabled,
} from "../store/store-fullscreen";

function getIsFullscreen() {
  return !!document.fullscreenElement;
}

function getIsFullscreenEnabled() {
  return !!document.fullscreenEnabled;
}

async function toggleFullscreen(el: HTMLElement = document.documentElement) {
  if (getIsFullscreen()) {
    return await exitFullscreen();
  } else {
    return await requestFullscreen(el);
  }
}

async function requestFullscreen(el: HTMLElement = document.documentElement) {
  try {
    await el.requestFullscreen();
    return true;
  } catch (e) {
    return false;
  }
}

async function exitFullscreen() {
  try {
    await document.exitFullscreen();
    return true;
  } catch (e) {
    return false;
  }
}

export function useFullscreen() {
  const storeIsFullscreen = useStoreIsFullscreen();
  const storeIsFullscreenEnabled = useStoreIsFullscreenEnabled();

  useEffect(() => {
    const onChange = () => {
      if (storeIsFullscreen.isFullscreen !== getIsFullscreen())
        useStoreIsFullscreen.setState({ isFullscreen: getIsFullscreen() });
    };

    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("fullscreenerror", onChange);

    if (storeIsFullscreen.isFullscreen !== getIsFullscreen())
      useStoreIsFullscreen.setState({ isFullscreen: getIsFullscreen() });
    if (
      storeIsFullscreenEnabled.isFullscreenEnabled !== getIsFullscreenEnabled()
    )
      useStoreIsFullscreenEnabled.setState({
        isFullscreenEnabled: getIsFullscreenEnabled(),
      });

    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("fullscreenerror", onChange);
    };
  }, []);

  return {
    isFullscreen: storeIsFullscreen.isFullscreen,
    isFullscreenEnabled: storeIsFullscreenEnabled.isFullscreenEnabled,
    toggleFullscreen,
    requestFullscreen,
    exitFullscreen,
  };
}
