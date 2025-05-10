<p align="center">
	<h1 align="center"><b>Bridge</b></h1>
<p align="center">
    Bridge the gap to automated viewings.
    <br />
    Give clients instant booking power and free your team from scheduling calls.
    <br />
    <br />
    <a href="https://usebridge.co.uk">Website</a>
  </p>
</p>

## 🚀 Development

To get started ensure you have [bun](https://bun.sh), [sst](https://sst.dev), and [docker](https://www.docker.com) installed.

You will need an API key from [Cloudflare](https://dash.cloudflare.com/profile/api-tokens) to deploy to Cloudflare and run the dev server through SST.

You can run individual dev servers for both Dashboard and Website locally by CD'ing into the respective directory and running `bun dev`.

```bash
# Install dependencies
bun install

# Start the SST development server
bun dev
```
### Database

The database is managed by [Drizzle](https://drizzle.org) and hosted on [Cloudflare](https://www.cloudflare.com) D1.

```bash
# Migrate the database
bun with-env drizzle-kit migrate

# Generate the database schema
bun with-env drizzle-kit generate
```

###  Zero Cache

Zero Cache is used for our local first experience to improve UX. It runs as a Docker container. You can find more information at [Zero Cache](https://zero.rocicorp.dev/docs/introduction).

On generating the schema below you may have to update the module declaration in `packages/db/package.json` to point to the correct namespace of `@ho/zero-schema` and delete any excess code generated.

```bash
# Generate the zero schema
bun with-env zero-cache-dev -p packages/zero-schema/src/index.js

# Run the zero cache locally
bun dev:zero-cache
```
