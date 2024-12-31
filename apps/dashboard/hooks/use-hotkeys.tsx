import { useWindowEvent } from "./use-window-event";

export function useHotkeys(
  hotkey: KeyboardEvent["key"],
  onKeyPress: (event: KeyboardEvent) => void,
  enabled = true,
) {
  useWindowEvent("keydown", (event) => {
    if (event.key === hotkey && enabled) {
      onKeyPress(event);
    }
  });
}
