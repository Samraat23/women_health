import type { Metadata } from "next";
import "./globals.css";

import AppChrome from "@/components/layout/AppChrome";

export const metadata: Metadata = {
  title: "Best Gynecologist for Women's Health | Dr. Kusum Lata Bhardwaj",
  description:
    "Dr. Kusum Lata Bhardwaj provides expert gynecology, pregnancy care, infertility treatment, endometriosis care, and advanced laparoscopic surgery for women's health.",
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
