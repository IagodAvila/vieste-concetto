import { eq, or, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { orders, paymentEvents } from "@/db/schema";
import { getPagBankToken, mapPagBankStatus, PagBankConfigurationError } from "@/lib/pagbank";

type PagBankNotification = {
  id?: string;
  reference_id?: string;
  status?: string;
  charges?: Array<{ id?: string; status?: string }>;
};

export async function POST(request: Request) {
  const rawPayload = await request.text();
  const receivedSignature = request.headers.get("x-authenticity-token")?.toLowerCase();

  let token: string;
  try {
    token = await getPagBankToken();
  } catch (error) {
    if (error instanceof PagBankConfigurationError) return new Response(null, { status: 503 });
    throw error;
  }

  if (!receivedSignature || !constantTimeEqual(receivedSignature, await sha256(`${token}-${rawPayload}`))) {
    return Response.json({ error: "Assinatura inválida." }, { status: 401 });
  }

  let payload: PagBankNotification;
  try {
    payload = JSON.parse(rawPayload) as PagBankNotification;
  } catch {
    return Response.json({ error: "Payload inválido." }, { status: 400 });
  }

  const providerStatus = payload.charges?.[0]?.status ?? payload.status;
  const providerObjectId = payload.charges?.[0]?.id ?? payload.id;
  if (!providerStatus || (!payload.reference_id && !payload.id)) return Response.json({ error: "Notificação incompleta." }, { status: 400 });

  const db = await getDb();
  const order = await db.select({ id: orders.id, status: orders.status }).from(orders).where(or(
    payload.reference_id ? eq(orders.referenceId, payload.reference_id) : undefined,
    payload.id ? eq(orders.pagbankCheckoutId, payload.id) : undefined,
  )).get();
  if (!order) return new Response(null, { status: 204 });

  const eventId = `${providerObjectId ?? payload.reference_id}:${providerStatus}`;
  await db.insert(paymentEvents).values({
    orderId: order.id,
    providerEventId: eventId,
    providerStatus,
    payload: rawPayload,
  }).onConflictDoNothing({ target: paymentEvents.providerEventId });

  const nextStatus = order.status === "PAID" ? "PAID" : mapPagBankStatus(providerStatus);
  await db.update(orders).set({ status: nextStatus, updatedAt: sql`CURRENT_TIMESTAMP` }).where(eq(orders.id, order.id));
  return new Response(null, { status: 204 });
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function constantTimeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
}
