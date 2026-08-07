import { asc, eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { fetchPagBankChargeStatus, mapPagBankStatus } from "@/lib/pagbank";

// Status em que o pedido ainda pode mudar — vale a pena reconciliar com o PagBank.
const PENDING_STATUSES = new Set(["DRAFT", "CHECKOUT_CREATED", "WAITING_PAYMENT", "IN_ANALYSIS", "PAYMENT_UPDATE"]);

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
    pagbankCheckoutId: orders.pagbankCheckoutId,
  }).from(orders).where(eq(orders.id, id)).get();
  if (!order) return null;

  // O webhook do PagBank nem sempre chega (comum em sandbox) — se o pedido ainda
  // está pendente, consulta ativamente o status real antes de responder.
  if (PENDING_STATUSES.has(order.status) && order.pagbankCheckoutId) {
    const chargeStatus = await fetchPagBankChargeStatus(order.pagbankCheckoutId);
    if (chargeStatus) {
      const nextStatus = mapPagBankStatus(chargeStatus);
      if (nextStatus !== order.status) {
        await db.update(orders).set({ status: nextStatus, updatedAt: sql`CURRENT_TIMESTAMP` }).where(eq(orders.id, id));
        order.status = nextStatus;
      }
    }
  }

  const { pagbankCheckoutId: _pagbankCheckoutId, ...publicOrder } = order;
  const items = await db.select({
    id: orderItems.id,
    productName: orderItems.productName,
    size: orderItems.size,
    quantity: orderItems.quantity,
    unitAmount: orderItems.unitAmount,
    totalAmount: orderItems.totalAmount,
  }).from(orderItems).where(eq(orderItems.orderId, id)).orderBy(asc(orderItems.id));
  return { ...publicOrder, items };
}
