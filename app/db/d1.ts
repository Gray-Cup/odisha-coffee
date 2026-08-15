import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema.d1";

export * from "./schema.d1";

// D1 is a Workers binding, passed in per-request via `context.cloudflare.env`
// (see app/load-context.d.ts / workers/app.ts) - there's no connection
// lifecycle to manage, so this is just a thin drizzle wrapper.
export function getOrdersDb(env: Env) {
  return drizzle(env.GRAYCUP_ORDERS_DB, { schema });
}
