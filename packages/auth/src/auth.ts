import { betterAuth } from "better-auth";
import { D1Dialect } from "kysely-d1";
import { Resource } from "sst";

export const auth = betterAuth({
  basePath: "/",
  advanced: {
    cookiePrefix: "bridge",
  },
  database: new D1Dialect({
    database: Resource.AuthDatabase,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
