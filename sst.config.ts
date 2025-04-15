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
    const hono = new sst.cloudflare.Worker("Hono", {
      domain: `${$app.stage}.api.hosolutions.co.uk`,
      handler: "packages/api/index.ts",
      url: true,
    });

    const dashboard = new sst.cloudflare.StaticSite("Dashboard", {
      domain: `${$app.stage}.app.usebridge.co.uk`,
      path: "apps/dashboard",
      build: {
        command: "bun build",
        output: "./dist",
      },
    });

    const website = new sst.cloudflare.StaticSite("Website", {
      domain: `${$app.stage}.usebridge.co.uk`,
      path: "apps/website",
      build: {
        command: "bun build",
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
