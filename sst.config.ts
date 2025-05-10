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

    const app = new sst.cloudflare.StaticSite("BridgeApp", {
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

    const appDatabase = new sst.cloudflare.D1("AppDatabase");
    const authDatabase = new sst.cloudflare.D1("AuthDatabase");

    const authApi = new sst.cloudflare.Worker("AuthApi", {
      domain: `${stagePrefix}auth.hosolutions.co.uk`,
      handler: "packages/auth/index.ts",
      url: true,
      link: [authDatabase, appDatabase],
    });

    const appApi = new sst.cloudflare.Worker("AppApi", {
      domain: `${stagePrefix}api.hosolutions.co.uk`,
      handler: "packages/api/index.ts",
      url: true,
      link: [authDatabase, appDatabase],
    });

    return {
      api: appApi.url,
      auth: authApi.url,
      app: app.url,
      website: website.url,
    };
  },
});
