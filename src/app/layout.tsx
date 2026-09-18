import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

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

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZX7VN8155C"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZX7VN8155C');
          `}
        </Script>
      </body>
    </html>
  );
}