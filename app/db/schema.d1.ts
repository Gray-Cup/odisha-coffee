import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const odishaCoffeeOrders = sqliteTable("odisha_coffee_orders", {
  id:             integer("id").primaryKey({ autoIncrement: true }),
  created_at:     integer("created_at").notNull(), // unix ms

  // customer
  name:           text("name").notNull(),
  phone:          text("phone").notNull(),
  email:          text("email"),
  country:        text("country").notNull().default("IN"),
  pincode:        text("pincode").notNull(),
  address:        text("address").notNull(),
  state:          text("state"),
  gst_or_tax_id:  text("gst_or_tax_id"),
  business_type:  text("business_type"),

  // order
  products:       text("products").notNull(), // JSON array of "productId:weight" strings
  quantity_tier:  text("quantity_tier").notNull(),
  items_detail:   text("items_detail"),        // JSON array of {slug,name,image,tier,grams,price}
  total_amount:   integer("total_amount").notNull(),

  // cashfree
  link_id:        text("link_id").notNull().unique(),
  cf_link_id:     text("cf_link_id"),   // Cashfree's own numeric link id, set after link creation
  cf_payment_id:  text("cf_payment_id"),  // Cashfree payment/transaction id, set by the PAYMENT_SUCCESS webhook
  payment_status: text("payment_status").notNull().default("pending"),

  // shipping - set by orders-graycup admin
  carrier:                text("carrier"),
  delhivery_waybill:      text("delhivery_waybill"),
  delhivery_pickup_date:  text("delhivery_pickup_date"),
  shadowfax_request_id:   text("shadowfax_request_id"),
  dispatch_status:        text("dispatch_status"),
});
