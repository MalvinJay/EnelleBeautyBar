import type { Metadata } from "next";
import { Figtree, Kaushan_Script } from "next/font/google";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], display: "swap", variable: "--font-figtree" });
const kaushan = Kaushan_Script({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-kaushan" });

export const metadata: Metadata = {
  title: "Enelle Beauty Bar | Luxury Hair & Beauty",
  description: "Luxury hair and beauty installations, curated around your signature look.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${figtree.variable} ${kaushan.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-cream text-charcoal antialiased">
        {children}
      </body>
    </html>
  )
}
