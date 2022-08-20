import { Shortcut, useShortcuts } from "../lib/shortcut";

export default function ShellShortcut(props: { shortcuts: Shortcut[] }) {
  // Shortcuts
  useShortcuts(props.shortcuts);

  // Renders
  return null;
}
