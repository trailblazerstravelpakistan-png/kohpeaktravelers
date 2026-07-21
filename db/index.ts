import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Postgres connection (Supabase-ready).
// Set DATABASE_URL in .env.local to your Supabase connection string, e.g.
//   postgresql://postgres:<password>@<host>:5432/postgres
// The connection is created lazily so the site runs fine without a database.
let db: ReturnType<typeof drizzle<typeof schema>> | undefined;

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add your Supabase connection string to .env.local before using the database."
    );
  }

  if (!db) {
    // `prepare: false` is recommended when using the Supabase transaction pooler.
    const client = postgres(url, { prepare: false });
    db = drizzle(client, { schema });
  }

  return db;
}
