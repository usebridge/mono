import { defineConfig } from "@tanstack/start/config";

export default defineConfig({
  vite: {
    optimizeDeps: {
      force: true,
    },
  },
});
