import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-playfair-display" });

export const metadata: Metadata = {
  title: "Enelle Beauty Bar | Luxury Hair & Beauty",
  description: "Luxury hair and beauty installations, curated around your signature look.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${inter.variable} ${playfair.variable}`}><body className="min-h-screen overflow-x-hidden bg-cream text-charcoal antialiased">{children}</body></html>;
}
