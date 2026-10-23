import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import RegisterServiceWorker from "./register-sw";
import RouteFocus from "@/components/shell/RouteFocus";
import Toasts from "@/components/shell/Toasts";
import { INSTALL_SCRIPT } from "@/lib/installScript";

// Variable font: weight 400–900 plus the width axis the type scale relies on (62–125).
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "PT Example hiring assessments",
  description: "Psychometric assessment results for PT Example store candidates.",
  manifest: "/manifest.webmanifest",
  robots: { index: false, follow: false },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Hiring",
  },
  icons: {
    icon: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#1D4ED8",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${archivo.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        {/* Keeps the browser's install offer if it comes before the app has started (lib/install.ts). */}
        <script dangerouslySetInnerHTML={{ __html: INSTALL_SCRIPT }} />
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <RegisterServiceWorker />
        <RouteFocus />
        {children}
        <Toasts />
      </body>
    </html>
  );
}
