import { defineConfig } from "@tanstack/start/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  tsr: {
    appDirectory: "./app",
  },
  vite: {
    optimizeDeps: {
      force: true,
    },
    plugins: [
      // @ts-expect-error - unsure what this error is about
      tsconfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
