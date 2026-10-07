import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SIGO — Gestão de Ocorrências",
    short_name: "SIGO — Gestão de Ocorrências",
    description: "Sistema institucional de gestão de ocorrências escolares",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f7f6",
    theme_color: "#08783e",
    lang: "pt-BR",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
