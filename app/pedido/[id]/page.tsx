import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { OrderStatus } from "@/components/order/OrderStatus";
import { getOrderSummary } from "@/lib/orders";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Acompanhar pedido — VIESTE CONCETTO",
  robots: { index: false, follow: false },
};

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const order = await getOrderSummary(id);
  if (!order) notFound();

  return (
    <main className="bg-peach-soft">
      <AnnouncementBar />
      <Header />
      <OrderStatus initialOrder={order} />
      <Footer />
    </main>
  );
}
