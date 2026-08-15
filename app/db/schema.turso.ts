import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Lives in a separate Turso (libsql) database from schema.ts (Postgres/Neon) -
// reviews are shared with orders-graycup for moderation, so the table shape
// here must stay in sync with orders-graycup/lib/db/schema.reviews.ts.
export const reviews = sqliteTable("reviews", {
  id:              text("id").primaryKey(),
  createdAt:       integer("created_at").notNull(),

  productId:       text("product_id").notNull(),      // catalog id (Product.id or EstateProduct.id)
  productCatalog:  text("product_catalog").notNull(),  // "product" | "estate"
  productName:     text("product_name").notNull(),     // snapshot at submit time

  reviewerName:    text("reviewer_name").notNull(),
  reviewerEmail:   text("reviewer_email").notNull(),

  rating:          integer("rating").notNull(),        // 1-5
  title:           text("title"),
  content:         text("content").notNull(),
  images:          text("images"),                     // JSON array of B2 public URLs, nullable

  status:          text("status").notNull().default("pending"), // pending | approved | rejected
  orderLinkId:     text("order_link_id"),               // odishaCoffeeOrders.link_id that verified the reviewer
  moderatedAt:     integer("moderated_at"),
});
