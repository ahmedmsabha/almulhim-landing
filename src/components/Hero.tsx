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
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden text-white"
    >
      <div className="absolute inset-0">
        <Image
          src={media.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] sm:object-center"
        />
        <div className="bg-hero-gradient absolute inset-0" />
        <div aria-hidden className="absolute inset-0 bg-navy-deep/50" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(201,162,39,0.2)_0%,transparent_58%)]"
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 px-5 py-24 sm:px-8 md:grid-cols-[1fr_auto] md:gap-10 md:py-28 lg:gap-14 lg:px-10">
        <motion.div
          className="flex flex-col text-start"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
          }}
        >
          <motion.p variants={item} className="text-label-md text-gold">
            منصة الملهم الذكي
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display mt-2 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {brand.shortNameAr}
          </motion.h1>

          <motion.span
            variants={item}
            aria-hidden
            className="mt-4 block h-px w-16 bg-gold"
          />

          <motion.p
            variants={item}
            className="mt-3 font-display text-base font-semibold text-gold-soft sm:text-xl"
          >
            {brand.tagline}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-2 font-display text-sm font-medium text-white/80 sm:text-base"
          >
            الأستاذ علي جودة
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-[0.95rem] leading-7 text-white/85 sm:mt-6 sm:text-lg sm:leading-8"
          >
            منصة تعليمية مبسّطة لطلاب التوجيهي في الفيزياء — جرّب دروسًا مجانية
            وتعرّف على أسلوب الأستاذ علي جودة قبل الاشتراك.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-7 flex w-full flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Button
              asChild
              size="lg"
              className="h-12 w-full gap-2 bg-primary px-5 text-base hover:bg-primary-container sm:h-11 sm:w-auto"
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
              className="h-12 w-full gap-2 border-white/30 bg-white/5 px-5 text-base text-white backdrop-blur-sm hover:bg-white/15 hover:text-white sm:h-11 sm:w-auto"
            >
              <a
                href="#plans"
                onClick={() => captureLandingEvent("hero_plans_click")}
              >
                <GraduationCap size={20} weight="duotone" />
                الاشتراك في الدورة الخاصّة
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.figure
          className="relative order-first mx-auto md:order-none md:mx-0"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            aria-hidden
            className="absolute -inset-5 rounded-full bg-gold/20 blur-2xl"
          />
          <div
            className="relative rounded-[1.7rem] p-[2px] shadow-[0_12px_40px_rgba(201,162,39,0.32)]"
            style={{
              background:
                "linear-gradient(145deg, #f3e6b4 0%, #e8d48b 18%, #c9a227 48%, #8a6d12 82%, #f0e2a8 100%)",
            }}
          >
            <div className="rounded-[1.55rem] bg-navy-deep p-[5px]">
              <div
                className="rounded-[1.3rem] p-[2px]"
                style={{
                  background:
                    "linear-gradient(325deg, #e8d48b 0%, #c9a227 55%, #8a6d12 100%)",
                }}
              >
                <div className="relative aspect-square w-[min(52vw,200px)] overflow-hidden rounded-[1.15rem] sm:w-[220px] lg:w-[248px]">
                  <Image
                    src="/t_ali_photo.jpg"
                    alt="الأستاذ علي جودة"
                    fill
                    priority
                    sizes="(min-width: 1024px) 248px, (min-width: 640px) 220px, 200px"
                    className="object-cover object-[center_18%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
