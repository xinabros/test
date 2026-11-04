import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  title: { default: "Test Shop", template: "%s · Test Shop" },
  description: "Test Shop: e-commerce dimostrativo realizzato con Next.js e Stripe.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2f6f5e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Chatbot />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
