import type { Metadata } from "next";
import "./globals.css";
import { inter, barlow } from "@/lib/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SHOP } from "@/lib/shop";

export const metadata: Metadata = {
  metadataBase: new URL(SHOP.siteUrl),
  title: {
    default: "Speedy Auto Service St. Catharines | Oil Changes, Brakes & Tires",
    template: "%s · Speedy Auto Service St. Catharines",
  },
  description:
    "Trusted auto repair in St. Catharines. Oil changes, brakes, tires, exhaust, batteries, and more. Family-owned service since day one. Book your appointment today.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Speedy Auto Service St. Catharines",
    url: SHOP.siteUrl,
    title: "Speedy Auto Service St. Catharines",
    description: SHOP.tagline,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${barlow.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
