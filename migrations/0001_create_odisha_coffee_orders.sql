-- Migration number: 0001 	 2026-08-15
CREATE TABLE odisha_coffee_orders (
  id                     INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at             INTEGER NOT NULL,

  -- customer
  name                   TEXT NOT NULL,
  phone                  TEXT NOT NULL,
  email                  TEXT,
  country                TEXT NOT NULL DEFAULT 'IN',
  pincode                TEXT NOT NULL,
  address                TEXT NOT NULL,
  state                  TEXT,
  gst_or_tax_id          TEXT,
  business_type          TEXT,

  -- order
  products               TEXT NOT NULL,
  quantity_tier          TEXT NOT NULL,
  items_detail           TEXT,
  total_amount           INTEGER NOT NULL,

  -- cashfree
  link_id                TEXT NOT NULL UNIQUE,
  cf_link_id             TEXT,
  payment_status         TEXT NOT NULL DEFAULT 'pending',

  -- dispatch (mirrors columns added later to the Postgres table)
  carrier                TEXT,
  delhivery_waybill      TEXT,
  delhivery_pickup_date  TEXT,
  shadowfax_request_id   TEXT,
  dispatch_status        TEXT
);

CREATE INDEX idx_odisha_coffee_orders_created_at ON odisha_coffee_orders (created_at);
CREATE INDEX idx_odisha_coffee_orders_email ON odisha_coffee_orders (email);
