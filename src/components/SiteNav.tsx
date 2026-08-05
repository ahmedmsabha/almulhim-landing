"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { List } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { brand } from "@/lib/brand";
import { captureLandingEvent } from "@/lib/posthog/capture";
import { cn } from "@/lib/utils";

const links = [
  { href: "#home", label: "الرئيسية" },
  { href: "#preview", label: "الدروس التجريبية" },
  { href: "#catalog", label: "المنهج" },
  { href: "#plans", label: "الباقات" },
  { href: "#about", label: "عن المنصة" },
  { href: "#contact", label: "تواصل" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300",
        scrolled
          ? "border-b border-border/80 bg-background/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="#home" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt={brand.shortNameAr}
            width={40}
            height={40}
            className="rounded-lg ring-1 ring-white/20"
            priority
          />
          <div className="leading-tight">
            <p
              className={cn(
                "font-display text-base font-bold transition-colors",
                scrolled ? "text-foreground" : "text-white",
              )}
            >
              {brand.shortNameAr}
            </p>
            <p
              className={cn(
                "text-xs transition-colors",
                scrolled ? "text-muted-foreground" : "text-white/70",
              )}
            >
              تصفّح بدون حساب
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                scrolled ? "text-muted-foreground" : "text-white/85 hover:text-white",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="lg"
            className={cn(
              "h-9 px-4",
              !scrolled &&
                "bg-gold text-navy hover:bg-gold-soft shadow-none",
            )}
          >
            <a
              href={brand.studentAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => captureLandingEvent("nav_start_click")}
            >
              ابدأ الآن
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "md:hidden",
                  !scrolled &&
                    "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white",
                )}
                aria-label="فتح القائمة"
              >
                <List size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle className="font-display text-start">
                  {brand.shortNameAr}
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1 px-2">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
