import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./src/schema";

const db = drizzle({
  schema,
  connection: {
    url: process.env.DATABASE_URL!,
    ssl: true,
  },
});

export { db, schema };
