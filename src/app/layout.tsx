import type { Metadata } from "next";
import "./globals.css";

import AppChrome from "@/components/layout/AppChrome";

export const metadata: Metadata = {
  title: "WHealth | Dr. Kusum Lata Bhardwaj",
  description:
    "Gynecology, pregnancy care, surgery and women's health support by Dr. Kusum Lata Bhardwaj.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
