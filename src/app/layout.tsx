import type { Metadata } from "next";
import Script from "next/script";
import SmoothScroll from "@/components/ui/SmoothScroll";
import "./globals.css";
import "./site.css";

export const metadata: Metadata = {
  title: "KAIROS · Lakeside Sanctuary — Sustainable Nordic Architecture & Private Residences",
  description:
    "An exclusive enclave of eight sustainable lakeside residences in an old-growth pine archipelago. 420 m² dual cantilever pavilions from $1.25M. Net-zero geothermal living.",
  icons: {
    icon: [
      { url: "/assets/favicon.svg?v=3", type: "image/svg+xml" },
      { url: "/assets/favicon-32.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-16.png?v=3", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {/* Real 3D Engine & Interactive Site Scripts from lake.aistlab.online */}
        <Script src="/assets/av3d.ef23d546.js" strategy="afterInteractive" />
        <Script src="/assets/site.6168a7de.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
