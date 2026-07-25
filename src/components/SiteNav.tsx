"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
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
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-container-lowest/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="#home" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt={brand.shortNameAr}
            width={40}
            height={40}
            className="rounded-lg"
            priority
          />
          <div className="leading-tight">
            <p className="font-display text-base font-bold text-on-surface">
              {brand.shortNameAr}
            </p>
            <p className="text-xs text-on-surface-variant">
              تصفّح بدون حساب
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={brand.studentAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => captureLandingEvent("nav_start_click")}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container"
          >
            ابدأ الآن
          </a>
          <button
            type="button"
            className="inline-flex rounded-md border border-border p-2 text-on-surface md:hidden"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-border bg-surface-container-lowest md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
