import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./src/schema";

const db = drizzle(process.env.DATABASE_URL!);

export { db, schema };
