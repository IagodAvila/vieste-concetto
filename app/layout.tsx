import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const metadataBase = new URL(`${protocol}://${host}`);
  const description = "Beachwear e resortwear criados no Brasil para vestir o tempo, a pele e a liberdade.";

  return {
    metadataBase,
    title: "Vieste Concetto — O verão começa por dentro",
    description,
    openGraph: {
      title: "Vieste Concetto",
      description,
      type: "website",
      images: [{ url: new URL("/og.png", metadataBase).toString(), width: 1536, height: 1024 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Vieste Concetto",
      description,
      images: [new URL("/og.png", metadataBase).toString()],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
