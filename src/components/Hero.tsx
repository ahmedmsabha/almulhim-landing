"use client";

import Image from "next/image";
import { GraduationCap, PlayCircle } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/brand";
import { media } from "@/lib/media";
import { captureLandingEvent } from "@/lib/posthog/capture";

export function Hero() {
  const reduce = useReducedMotion();

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden text-white"
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 origin-center"
          initial={reduce ? false : { scale: 1.08 }}
          animate={reduce ? undefined : { scale: 1 }}
          transition={{ duration: 18, ease: "linear" }}
        >
          <Image
            src={media.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="bg-hero-gradient absolute inset-0" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-navy/30"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-32 sm:px-6 sm:pb-28">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.12, delayChildren: 0.15 },
            },
          }}
        >
          <motion.h1
            variants={item}
            className="font-display text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {brand.shortNameAr}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-4 font-display text-xl font-semibold text-gold-soft sm:text-2xl"
          >
            {brand.tagline}
          </motion.p>
          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-base leading-8 text-white/80 sm:text-lg"
          >
            منصة تعليمية مبسّطة لطلاب التوجيهي في الفيزياء — تصفّح المنهج والدروس
            التجريبية بدون حساب.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-11 gap-2 bg-primary px-5 text-base hover:bg-primary-container"
            >
              <a
                href="#preview"
                onClick={() => captureLandingEvent("hero_preview_click")}
              >
                <PlayCircle size={20} weight="fill" />
                مشاهدة دروس تجريبية
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 gap-2 border-white/30 bg-white/5 px-5 text-base text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
            >
              <a
                href="#catalog"
                onClick={() => captureLandingEvent("hero_catalog_click")}
              >
                <GraduationCap size={20} weight="duotone" />
                اطّلع على المنهج
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
