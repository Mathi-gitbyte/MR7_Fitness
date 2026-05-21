import type { Metadata } from "next";
import { Barlow_Condensed, Rajdhani } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-display",
});

const rajdhani = Rajdhani({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "MR7 Unisex Fitness",
  description: "MR7 Unisex Fitness — Chennai's premier gym. Gym, MMA, Zumba, Yoga, Kickboxing, Personal Training & more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${barlowCondensed.variable} ${rajdhani.variable}`}
      >
        <Preloader />
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
