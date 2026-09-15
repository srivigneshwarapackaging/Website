import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-family",
});

const hero = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-hero-family",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body-family",
});

export const metadata: Metadata = {
  title: {
    default: "Sri Vigneshwara Packaging — Corrugated boxes, Bengaluru",
    template: "%s | Sri Vigneshwara Packaging",
  },
  description:
    "Corrugated packaging engineered to perform. 3 to 7-ply boxes, export cartons and custom die-cut packaging manufactured in Bengaluru.",
  openGraph: {
    title: "Sri Vigneshwara Packaging",
    description:
      "Corrugated packaging engineered to perform — manufactured in Bengaluru since the 1990s.",
    type: "website",
  },
  icons: {
    icon: "/brand/logo-mark.svg",
    apple: "/brand/logo-mark.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${hero.variable} ${body.variable} font-body bg-white text-text-primary antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <NextAuthProvider>
          <AnalyticsProvider>{children}</AnalyticsProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
