import type { Metadata } from "next";
import { Cairo, Noto_Sans_Arabic } from "next/font/google";
import { PostHogBootstrap } from "@/components/PostHogBootstrap";
import { DirectionProvider } from "@/components/ui/direction";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
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
  // Icons come from the app/ file conventions (favicon.ico, icon.png,
  // apple-icon.png). Those take precedence over this field, so pointing it at
  // logo.jpg only shipped a 1254px JPEG that browsers ignored.
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
      className={cn("h-full", cairo.variable, notoSansArabic.variable, "font-sans")}
    >
      <body className="min-h-full overflow-x-hidden bg-background text-foreground">
        <DirectionProvider dir="rtl">
          <PostHogBootstrap />
          {children}
        </DirectionProvider>
      </body>
    </html>
  );
}
