import type { Metadata } from "next";
import { headers } from "next/headers";
import { ShopProvider } from "@/components/providers/ShopProvider";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const metadataBase = new URL(`${protocol}://${host}`);
  const description = "Coleções de forma precisa e matérias que acolhem o corpo. Feminino e UOMO, com envio para todo o Brasil.";

  return {
    metadataBase,
    title: "VIESTE CONCETTO — Moda brasileira contemporânea",
    description,
    openGraph: {
      title: "VIESTE CONCETTO — Moda brasileira contemporânea",
      description,
      type: "website",
      images: [{ url: new URL("/og.png", metadataBase).toString(), width: 1920, height: 1080 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "VIESTE CONCETTO — Moda brasileira contemporânea",
      description,
      images: [new URL("/og.png", metadataBase).toString()],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body><ShopProvider>{children}</ShopProvider></body>
    </html>
  );
}
