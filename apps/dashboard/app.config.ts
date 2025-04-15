import { defineConfig } from "@tanstack/start/config";
import { cloudflare } from "unenv";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  tsr: {
    appDirectory: "./app",
  },
  server: {
    preset: "cloudflare",
    unenv: cloudflare,
  },
  vite: {
    optimizeDeps: {
      force: true,
    },
    build: {
      outDir: "./dist",
    },
    plugins: [
      // @ts-expect-error - unsure what this error is about
      tsconfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
