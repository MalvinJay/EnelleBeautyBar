import type { Metadata } from "next";
import { Figtree, Kaushan_Script } from "next/font/google";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], display: "swap", variable: "--font-figtree" });
const kaushan = Kaushan_Script({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-kaushan" });

export const metadata: Metadata = {
  title: "Enelle Beauty Bar | Luxury Hair & Beauty Salon in North Legon",
  description: "Luxury frontal installs, K-Tips, Tape-Ins, and camera-ready bridal hair styling at 25 Pawpaw Street, Agbogba, North Legon, Accra, Ghana.",
  keywords: ["Enelle Beauty Bar", "Hair salon North Legon", "Frontal install Accra", "K-Tips Ghana", "Bridal hair stylist Accra", "Agbogba hair studio"],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Enelle Beauty Bar",
  "image": "https://enellebeautybar.com/logo.png",
  "telephone": "+233555062291",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "25 Pawpaw Street, Agbogba",
    "addressLocality": "North Legon",
    "addressRegion": "Greater Accra",
    "addressCountry": "GH"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 5.6792376,
    "longitude": -0.1873117
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "19:00"
  },
  "priceRange": "GH₵ 250 - GH₵ 2000"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${figtree.variable} ${kaushan.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-cream text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}

