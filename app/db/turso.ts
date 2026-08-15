import { drizzle } from "drizzle-orm/libsql";
import { createClient, type Client } from "@libsql/client";
import { sql as drizzleSql } from "drizzle-orm";
import * as schema from "./schema.turso";

export * from "./schema.turso";

let _client: Client | null = null;
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

// libsql's client talks HTTP, not a raw TCP socket, so - unlike the old
// Postgres connection - caching it once per Worker isolate is safe (no
// "Cannot perform I/O on behalf of a different request" risk). `env` is
// stable for the life of the isolate, so this only needs to run once.
export function getTursoDb(env: Env) {
  if (!_db) {
    if (!env.TURSO_DATABASE_URL) {
      throw new Error("TURSO_DATABASE_URL is not set");
    }
    _client = createClient({
      url: env.TURSO_DATABASE_URL,
      authToken: env.TURSO_AUTH_TOKEN,
    });
    _db = drizzle(_client, { schema });
  }
  return _db;
}

// Mirrors the ensureXTable() convention used throughout orders-graycup's
// lib/db/b2b.ts - called defensively before any query so the table exists
// even before a human has ever provisioned it by hand. Kept in sync with
// orders-graycup/lib/db/reviews.ts, which runs the identical statement
// against the same physical Turso database.
export async function ensureReviewsTable(env: Env): Promise<void> {
  const d = getTursoDb(env);
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
