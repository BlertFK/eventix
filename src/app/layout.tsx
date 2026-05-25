import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/components/ui/Toast";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-neue",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Eventix - Discover. Book. Experience.",
  description:
    "Your gateway to the best events - concerts, festivals, sports, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground">
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <SmoothScroll />
              <CustomCursor />
              {children}
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
