Bun.build({
  entrypoints: ["./zero/zero-schema.ts"],
  naming: { entry: "index.js" },
  outdir: "../zero-schema/src",
  external: [
    "drizzle-orm",
    "drizzle-kit",
    "drizzle-zero",
    "tsx",
    "dotenv",
    "dotenv-cli",
    "@rocicorp/zero",
    "../src",
  ],
  format: "esm",
  target: "browser",
  conditions: ["browser", "development"],
  packages: "bundle",
});
