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
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden text-white"
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
          className="absolute inset-0 bg-navy-deep/50"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.22)_0%,transparent_58%)]"
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-4 pb-12 pt-24 text-center sm:px-6 sm:pb-16 sm:pt-28"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.1, delayChildren: 0.08 },
          },
        }}
      >
        <motion.p
          variants={item}
          className="text-label-md text-gold"
        >
          منصة الملهم الذكي
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display mt-2 text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl"
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
          className="mt-3 font-display text-lg font-semibold text-gold-soft sm:text-xl"
        >
          {brand.tagline}
        </motion.p>

        <motion.figure variants={item} className="relative mt-6 sm:mt-7">
          <div
            aria-hidden
            className="absolute -inset-8 rounded-full bg-gold/20 blur-3xl"
          />
          <div
            className="relative rounded-3xl p-[3px] shadow-[0_12px_60px_rgba(201,162,39,0.28)]"
            style={{
              background:
                "linear-gradient(160deg, #e8d48b 0%, #c9a227 48%, #8a6d12 100%)",
            }}
          >
            <div className="rounded-[1.35rem] bg-navy p-[3px]">
              <div className="relative aspect-square w-[min(64vw,240px)] overflow-hidden rounded-[1.2rem] sm:w-[320px]">
                <Image
                  src="/t_ali_photo.jpg"
                  alt="الأستاذ علي جودة"
                  fill
                  priority
                  sizes="(min-width: 640px) 320px, 240px"
                  className="object-cover object-[center_18%]"
                />
              </div>
            </div>
          </div>
          <figcaption className="relative mt-4 font-display text-base font-semibold text-white sm:text-lg">
            الأستاذ علي جودة
          </figcaption>
        </motion.figure>

        <motion.p
          variants={item}
          className="mt-5 max-w-xl text-[0.95rem] leading-7 text-white/85 sm:mt-6 sm:text-lg sm:leading-8"
        >
          منصة تعليمية مبسّطة لطلاب التوجيهي في الفيزياء — جرّب دروسًا مجانية
          وتعرّف على أسلوب الأستاذ علي جودة قبل الاشتراك.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap"
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
    </section>
  );
}
