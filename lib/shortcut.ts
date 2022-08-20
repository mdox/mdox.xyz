import { useEffect, useMemo } from "react";

export type Shortcut = {
  key: string;
  alt?: boolean;
  ctrl?: boolean;
  shift?: boolean;
  handler: () => void;
};

export function useShortcuts(shortcuts: Shortcut[]) {
  // Memo
  const shortcutMap = useMemo(() => {
    const result: Record<string, () => void> = {};

    for (const shortcut of shortcuts) {
      const hash = [
        shortcut.key.toLowerCase(),
        !!shortcut.alt ? 1 : 0,
        !!shortcut.ctrl ? 1 : 0,
        !!shortcut.shift ? 1 : 0,
      ].join(":");

      result[hash] = shortcut.handler;
    }

    return result;
  }, [shortcuts]);

  // Events
  function onKeyDown(e: globalThis.KeyboardEvent) {
    const hash = [
      e.key.toLowerCase(),
      !!e.altKey ? 1 : 0,
      !!e.ctrlKey ? 1 : 0,
      !!e.shiftKey ? 1 : 0,
    ].join(":");

    const handler = shortcutMap[hash];

    if (handler) {
      e.preventDefault();
      e.stopPropagation();
      handler();
    }
  }

  // Life
  useEffect(() => {
    globalThis.addEventListener("keydown", onKeyDown, { passive: false });
    return () => {
      globalThis.removeEventListener("keydown", onKeyDown);
    };
  }, []);
}
