import { getOrderSummary } from "@/lib/orders";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return Response.json({ error: "Pedido inválido." }, { status: 400 });
  try {
    const order = await getOrderSummary(id);
    if (!order) return Response.json({ error: "Pedido não encontrado." }, { status: 404 });
    return Response.json(order, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Não foi possível consultar o pedido", error);
    return Response.json({ error: "Não foi possível consultar o pedido." }, { status: 503 });
  }
}
