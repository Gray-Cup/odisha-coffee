import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema.d1";

export * from "./schema.d1";

// D1 is a Workers binding (env.GRAYCUP_ORDERS_DB), not a URL-based connection,
// so there's no socket/pool lifecycle to manage here - unlike src/db/index.ts
// (Postgres), a fresh drizzle wrapper per call is cheap and there's nothing
// to close.
export async function getOrdersDb() {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle(env.GRAYCUP_ORDERS_DB, { schema });
}
