import type { Metadata } from "next";
import {
  Hanken_Grotesk,
  Inter,
  JetBrains_Mono,
  Noto_Sans_Arabic,
} from "next/font/google";
import { PostHogBootstrap } from "@/components/PostHogBootstrap";
import { brand } from "@/lib/brand";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500"],
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3002",
  ),
  title: `${brand.shortNameAr} | ${brand.tagline}`,
  description: brand.description,
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: `${brand.shortNameAr} — ${brand.tagline}`,
    description: brand.description,
    images: ["/og.jpg"],
    locale: "ar_PS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${hankenGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${notoSansArabic.variable} h-full`}
    >
      <body className="min-h-full bg-background text-on-surface">
        <PostHogBootstrap />
        {children}
      </body>
    </html>
  );
}
