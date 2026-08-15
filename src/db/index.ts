import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export * from "./schema";

// This app runs as a Cloudflare Worker (OpenNext). Workers reuse isolates
// across unrelated requests, but a raw TCP socket (which is what postgres.js
// opens under nodejs_compat) is tied to the request that created it - reusing
// one from a previous request throws "Cannot perform I/O on behalf of a
// different request". So, unlike a long-running Node server, there must be
// NO module-level cached client/pool here. Each caller creates a fresh
// connection for the lifetime of its own request and closes it when done.
export function createDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  const client = postgres(process.env.DATABASE_URL, {
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
    // Neon's pooled (-pooler) endpoint runs PgBouncer in transaction mode,
    // which doesn't support protocol-level prepared statements.
    prepare: false,
  });
  return {
    db: drizzle(client, { schema }),
    close: () => client.end({ timeout: 5 }),
  };
}
