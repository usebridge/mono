import { useEffect } from "react";

export function useWindowEvent<K extends string>(
  type: K,
  listener: K extends keyof WindowEventMap
    ? (this: Window, ev: WindowEventMap[K]) => void
    : (this: Window, ev: CustomEvent) => void,
  options?: boolean | AddEventListenerOptions,
) {
  useEffect(() => {
    // biome-ignore lint/suspicious/noExplicitAny: We can safely ignore any in this file
    window.addEventListener(type as any, listener, options);
    // biome-ignore lint/suspicious/noExplicitAny: We can safely ignore any in this file
    return () => window.removeEventListener(type as any, listener, options);
  }, [type, listener, options]);
}
