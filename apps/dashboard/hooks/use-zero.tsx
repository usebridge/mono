import type { Schema } from "@ho/zero-schema";
import { useZero as useZeroBase } from "@rocicorp/zero/react";

export function useZero() {
  const zero = useZeroBase<Schema>();
  return zero;
}
