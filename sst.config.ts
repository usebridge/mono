/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "ho-solutions",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "cloudflare",
    };
  },
  async run() {
    const stagePrefix = $app.stage === "production" ? "" : `${$app.stage}.`;

    const hono = new sst.cloudflare.Worker("Hono", {
      domain: `${stagePrefix}api.hosolutions.co.uk`,
      handler: "packages/api/index.ts",
      url: true,
    });

    const dashboard = new sst.cloudflare.StaticSite("Dashboard", {
      domain: `${stagePrefix}app.usebridge.co.uk`,
      path: "apps/dashboard",
      build: {
        command: "bun run build",
        output: "./dist",
      },
    });

    const website = new sst.cloudflare.StaticSite("Website", {
      domain: `${stagePrefix}usebridge.co.uk`,
      path: "apps/website",
      build: {
        command: "bun run build",
        output: "./dist",
      },
    });

    return {
      dashboard: dashboard.url,
      website: website.url,
      api: hono.url,
    };
  },
});
