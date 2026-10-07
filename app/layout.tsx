import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIGO — Gestão de Ocorrências",
  description: "Sistema institucional de gestão de ocorrências escolares",
};

export const viewport: Viewport = { themeColor: "#08783e" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
