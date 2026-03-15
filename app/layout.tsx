import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Banner from "@/components/banner";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { CartCountProvider } from "@/context/cart-count";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL || "http://localhost:3000"),
  title: {
    default: "Swag Store",
    template: "%s | Swag Store",
  },
  description:
    "Shop the latest branded merchandise, apparel, and accessories at Swag Store.",
  keywords: ["swag", "merchandise", "apparel", "accessories", "branded gear"],
  authors: [{ name: "Swag Store" }],
  creator: "Swag Store",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Swag Store",
    title: "Swag Store",
    description:
      "Shop the latest branded merchandise, apparel, and accessories at Swag Store.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swag Store",
    description:
      "Shop the latest branded merchandise, apparel, and accessories at Swag Store.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <CartCountProvider>
          <Header />
          <Banner />
          <main className="space-y-20">{children}</main>
          <Footer />
        </CartCountProvider>
        <Toaster />
      </body>
    </html>
  );
}
