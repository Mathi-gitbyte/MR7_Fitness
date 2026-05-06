import type { Metadata } from "next";
import { Barlow_Condensed, Rajdhani } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  weight: ["900"],
  subsets: ["latin"],
  variable: "--font-display",
});

const rajdhani = Rajdhani({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "MR7 Fitness",
  description: "MR7 Fitness - Push your limits",
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
        {children}
      </body>
    </html>
  );
}
