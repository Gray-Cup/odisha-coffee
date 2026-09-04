-- Migration number: 0002 	 2026-09-04
-- Cashfree's payment/transaction id, set by the PAYMENT_SUCCESS webhook
-- (app/routes/api-webhooks-cashfree.ts). Distinct from cf_link_id, which
-- holds the cf_order_id created at checkout.
ALTER TABLE odisha_coffee_orders ADD COLUMN cf_payment_id TEXT;
