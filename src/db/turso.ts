import { drizzle } from "drizzle-orm/libsql";
import { createClient, type Client } from "@libsql/client";
import { sql as drizzleSql } from "drizzle-orm";
import * as schema from "./schema.turso";

export * from "./schema.turso";

let _client: Client | null = null;
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

function getTursoDb() {
  if (!_db) {
    if (!process.env.TURSO_DATABASE_URL) {
      throw new Error("TURSO_DATABASE_URL is not set");
    }
    _client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    _db = drizzle(_client, { schema });
  }
  return _db;
}

export const tursoDb = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_target, prop) {
    return (getTursoDb() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

// Mirrors the ensureXTable() convention used throughout orders-graycup's
// lib/db/b2b.ts - called defensively before any query so the table exists
// even before a human has ever provisioned it by hand. Kept in sync with
// orders-graycup/lib/db/reviews.ts, which runs the identical statement
// against the same physical Turso database.
export async function ensureReviewsTable(): Promise<void> {
  const d = getTursoDb();
  await d.run(drizzleSql`
    CREATE TABLE IF NOT EXISTS reviews (
      id               text    PRIMARY KEY,
      created_at       integer NOT NULL,
      product_id       text    NOT NULL,
      product_catalog  text    NOT NULL,
      product_name     text    NOT NULL,
      reviewer_name    text    NOT NULL,
      reviewer_email   text    NOT NULL,
      rating           integer NOT NULL,
      title            text,
      content          text    NOT NULL,
      images           text,
      status           text    NOT NULL DEFAULT 'pending',
      order_link_id    text,
      moderated_at     integer
    )
  `);
}
