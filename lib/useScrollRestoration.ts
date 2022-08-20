/**
 * Based on https://gist.github.com/claus/992a5596d6532ac91b24abe24e10ae81
 * - see https://github.com/vercel/next.js/issues/3303#issuecomment-628400930
 * - see https://github.com/vercel/next.js/issues/12530#issuecomment-628864374
 */
import Router, { NextRouter } from "next/router";
import { useEffect } from "react";
import {
  getScrollInfoItem,
  setScrollInfoItem,
} from "../store/store-scroll-info";

function saveScrollPos(asPath: string) {
  setScrollInfoItem(`scrollPos:${asPath}`, {
    top: window.scrollY,
    height: document.body.scrollHeight,
  });
}

function restoreScrollPos(asPath: string) {
  const scrollPos = getScrollInfoItem(`scrollPos:${asPath}`);
  if (scrollPos) {
    if (scrollPos.height)
      document.body.style.minHeight = `${scrollPos.height}px`;
    window.scrollTo(0, scrollPos.top);
  }
}

export function finishScrollRestoration() {
  if (typeof globalThis.window !== "undefined") {
    document.body.style.removeProperty("min-height");
  }
}

export function useScrollRestoration(router: NextRouter) {
  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;
    let shouldScrollRestore = false;
    window.history.scrollRestoration = "manual";
    restoreScrollPos(router.asPath);

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      saveScrollPos(router.asPath);
      delete event["returnValue"];
    };

    const onRouteChangeStart = () => {
      saveScrollPos(router.asPath);
    };

    const onRouteChangeComplete = (url: string) => {
      if (shouldScrollRestore) {
        shouldScrollRestore = false;
        /**
         * Calling with relative url, not expected asPath, so this
         * will break if there is a basePath or locale path prefix.
         */
        restoreScrollPos(url);
      }
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    Router.events.on("routeChangeStart", onRouteChangeStart);
    Router.events.on("routeChangeComplete", onRouteChangeComplete);
    Router.beforePopState(() => {
      shouldScrollRestore = true;
      return true;
    });

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      Router.events.off("routeChangeStart", onRouteChangeStart);
      Router.events.off("routeChangeComplete", onRouteChangeComplete);
      Router.beforePopState(() => true);
    };
  }, [router]);
}
