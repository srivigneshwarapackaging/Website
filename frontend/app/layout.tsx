import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeContext";
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
    default: "Sri Vigneshwara Packaging | Premium Corrugated Solutions",
    template: "%s | Sri Vigneshwara Packaging",
  },
  description:
    "High-performance corrugated manufacturing and sustainable industrial packaging in Bengaluru.",
  openGraph: {
    title: "Sri Vigneshwara Packaging",
    description: "Premium corrugated packaging — built to last, designed to protect.",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${hero.variable} ${body.variable} font-body bg-surface dark:bg-surface-dark text-stone-900 dark:text-stone-50 antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <NextAuthProvider>
          <ThemeProvider>
            <AnalyticsProvider>{children}</AnalyticsProvider>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
