import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [sitemap(), tailwind()],
  site: "https://usebridge.co.uk",
});
