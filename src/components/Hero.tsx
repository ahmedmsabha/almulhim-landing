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
            className="object-cover object-[center_30%] sm:object-center"
          />
        </motion.div>
        <div className="bg-hero-gradient absolute inset-0" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/55 to-navy/40 sm:from-navy-deep/90 sm:via-transparent sm:to-navy/30"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-16 pt-28 sm:px-6 sm:pb-28 sm:pt-32 lg:flex-row-reverse lg:items-end lg:gap-6">
        <motion.div
          className="relative h-[min(52svh,420px)] w-full max-w-md shrink-0 lg:h-[min(70svh,640px)] lg:w-[min(46%,520px)] lg:max-w-none"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/t_ali_photo.jpg"
            alt="الأستاذ علي جودة"
            fill
            priority
            sizes="(min-width: 1024px) 46vw, 90vw"
            className="hero-teacher-photo object-contain object-bottom"
          />
        </motion.div>

        <motion.div
          className="mt-6 w-full max-w-2xl lg:mt-0 lg:flex-1"
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
            className="font-display text-[2.65rem] font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {brand.shortNameAr}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-3 font-display text-lg font-semibold text-gold-soft sm:mt-4 sm:text-2xl"
          >
            {brand.tagline}
          </motion.p>
          <motion.p
            variants={item}
            className="mt-3 max-w-xl text-[0.95rem] leading-7 text-white/85 sm:mt-4 sm:text-lg sm:leading-8"
          >
            منصة تعليمية مبسّطة لطلاب التوجيهي في الفيزياء — جرّب دروسًا مجانية
            وتعرّف على أسلوب الأستاذ علي جودة قبل الاشتراك.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
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
      </div>
    </section>
  );
}
