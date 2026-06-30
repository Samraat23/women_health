import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";

import AppChrome from "@/components/layout/AppChrome";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
      <body className={`${manrope.className} antialiased`}>
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
