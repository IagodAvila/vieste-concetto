import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Checkout — VIESTE CONCETTO",
  description: "Revise sua sacola e informe os dados de entrega para concluir sua compra.",
};

export default function CheckoutPage() {
  return (
    <main className="bg-peach-soft">
      <AnnouncementBar />
      <Header />
      <CheckoutForm />
      <Footer />
    </main>
  );
}
