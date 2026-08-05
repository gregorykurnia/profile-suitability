import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DEUS Individual Profile Suitability Report",
    short_name: "DEUS Report",
    description: "Psychometric suitability report by DEUS Human Capital Services",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#e30613",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
