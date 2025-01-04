import { defineConfig } from "@tanstack/start/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  vite: {
    optimizeDeps: {
      force: true,
    },
    plugins: [tsconfigPaths()],
  },
});
