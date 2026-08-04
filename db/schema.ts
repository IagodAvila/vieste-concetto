import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  referenceId: text("reference_id").notNull(),
  status: text("status").notNull().default("DRAFT"),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerDocument: text("customer_document").notNull(),
  postalCode: text("postal_code").notNull(),
  address: text("address").notNull(),
  addressNumber: text("address_number").notNull(),
  addressComplement: text("address_complement"),
  district: text("district").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  shippingMethod: text("shipping_method").notNull().default("standard"),
  shippingAmount: integer("shipping_amount").notNull().default(0),
  subtotalAmount: integer("subtotal_amount").notNull(),
  totalAmount: integer("total_amount").notNull(),
  pagbankCheckoutId: text("pagbank_checkout_id"),
  paymentUrl: text("payment_url"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  uniqueIndex("orders_reference_id_unique").on(table.referenceId),
  index("orders_status_idx").on(table.status),
]);

export const orderItems = sqliteTable("order_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: text("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productSlug: text("product_slug").notNull(),
  productName: text("product_name").notNull(),
  size: text("size").notNull(),
  quantity: integer("quantity").notNull(),
  unitAmount: integer("unit_amount").notNull(),
  totalAmount: integer("total_amount").notNull(),
}, (table) => [index("order_items_order_id_idx").on(table.orderId)]);

export const paymentEvents = sqliteTable("payment_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: text("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  providerEventId: text("provider_event_id"),
  providerStatus: text("provider_status").notNull(),
  payload: text("payload").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("payment_events_order_id_idx").on(table.orderId),
  uniqueIndex("payment_events_provider_event_id_unique").on(table.providerEventId),
]);
