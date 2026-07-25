"use client";

import Image from "next/image";
import { GraduationCap, PlayCircle } from "@phosphor-icons/react";
import { brand } from "@/lib/brand";
import { captureLandingEvent } from "@/lib/posthog/capture";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-border"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,#dae2fd_0%,transparent_45%),radial-gradient(ellipse_at_80%_0%,#e2dfff_0%,transparent_40%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #3525cd 1px, transparent 1px), linear-gradient(to bottom, #3525cd 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div className="reveal order-2 lg:order-1">
          <p className="text-label-md mb-3 uppercase text-primary">
            {brand.nameEn}
          </p>
          <h1 className="text-display-lg text-on-surface sm:text-5xl sm:leading-tight">
            {brand.shortNameAr}
          </h1>
          <p className="mt-3 font-display text-2xl font-semibold text-primary sm:text-3xl">
            {brand.tagline}
          </p>
          <p className="mt-4 max-w-xl text-base leading-8 text-on-surface-variant">
            {brand.description}
          </p>
          <p className="mt-3 text-sm font-medium text-on-surface-variant">
            التصفّح مجاني — لا يلزم حساب لرؤية المنهج أو مشاهدة الدروس التجريبية.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#preview"
              onClick={() => captureLandingEvent("hero_preview_click")}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition-transform hover:-translate-y-0.5 hover:bg-primary-container"
            >
              <PlayCircle size={20} weight="fill" />
              مشاهدة دروس تجريبية
            </a>
            <a
              href="#catalog"
              onClick={() => captureLandingEvent("hero_catalog_click")}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-container-lowest px-5 py-3 text-sm font-semibold text-on-surface transition-colors hover:border-primary hover:text-primary"
            >
              <GraduationCap size={20} weight="duotone" />
              اطّلع على المنهج
            </a>
          </div>
        </div>

        <div className="reveal reveal-delay-2 order-1 flex justify-center lg:order-2">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-8 rounded-full bg-secondary-container/60 blur-2xl"
            />
            <div className="float-soft relative overflow-hidden rounded-2xl border border-border bg-surface-container-lowest p-3 shadow-[0_24px_60px_-28px_rgba(53,37,205,0.45)]">
              <Image
                src="/logo.jpg"
                alt={brand.shortNameAr}
                width={320}
                height={320}
                className="rounded-xl"
                priority
              />
              <p className="mt-3 text-center text-sm text-on-surface-variant">
                دوسية الملهم — دروس تأسيس ومنهاج
              </p>
            </div>
            <span
              aria-hidden
              className="absolute -start-4 top-8 rounded-md bg-primary-fixed px-2 py-1 text-xs font-medium text-on-primary-fixed-variant"
            >
              E = mc²
            </span>
            <span
              aria-hidden
              className="absolute -end-2 bottom-16 rounded-md bg-secondary-container px-2 py-1 text-xs font-medium text-on-secondary-container"
            >
              V = IR
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
