import { asc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { orderItems, orders } from "@/db/schema";

export type OrderSummary = {
  id: string;
  referenceId: string;
  status: string;
  customerName: string;
  city: string;
  state: string;
  totalAmount: number;
  paymentUrl: string | null;
  createdAt: string;
  items: Array<{ id: number; productName: string; size: string; quantity: number; unitAmount: number; totalAmount: number }>;
};

export async function getOrderSummary(id: string): Promise<OrderSummary | null> {
  const db = await getDb();
  const order = await db.select({
    id: orders.id,
    referenceId: orders.referenceId,
    status: orders.status,
    customerName: orders.customerName,
    city: orders.city,
    state: orders.state,
    totalAmount: orders.totalAmount,
    paymentUrl: orders.paymentUrl,
    createdAt: orders.createdAt,
  }).from(orders).where(eq(orders.id, id)).get();
  if (!order) return null;
  const items = await db.select({
    id: orderItems.id,
    productName: orderItems.productName,
    size: orderItems.size,
    quantity: orderItems.quantity,
    unitAmount: orderItems.unitAmount,
    totalAmount: orderItems.totalAmount,
  }).from(orderItems).where(eq(orderItems.orderId, id)).orderBy(asc(orderItems.id));
  return { ...order, items };
}
