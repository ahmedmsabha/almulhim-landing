"use client";

import Image from "next/image";
import {
  ChatsCircle,
  DeviceMobile,
  FolderOpen,
  Question,
  VideoCamera,
  ChartLineUp,
} from "@phosphor-icons/react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { media } from "@/lib/media";

const features = [
  {
    icon: ChatsCircle,
    title: "مجموعات دعم مباشرة",
    description:
      "تواصل يومي مع المعلمين عبر واتساب وفيسبوك للإجابة السريعة على الاستفسارات.",
  },
  {
    icon: Question,
    title: "بنك أسئلة وتدريب مكثف",
    description:
      "نماذج وزارية وأسئلة سنوات سابقة لضمان جاهزيتك قبل الامتحان.",
  },
  {
    icon: FolderOpen,
    title: "ملخصات وملفات",
    description:
      "ملخصات ذكية تركز على الأفكار والقوانين والنقاط المتكررة في الامتحانات.",
  },
  {
    icon: VideoCamera,
    title: "حصص مسجّلة",
    description:
      "شرح مفصّل لكل موضوع في المنهاج الفلسطيني عبر شاشات تفاعلية.",
  },
  {
    icon: DeviceMobile,
    title: "تطبيق لكل الأجهزة",
    description:
      "دروس وأسئلة وملفات في مكان واحد على الجوال والحاسوب.",
  },
  {
    icon: ChartLineUp,
    title: "متابعة مستمرة",
    description:
      "محتوى يتحدّث حسب احتياجات الطلاب وتغيّرات المنهاج.",
  },
] as const;

export function Features() {
  return (
    <section id="features" className="border-b border-border py-12 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:gap-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal className="relative order-2 aspect-[16/10] overflow-hidden rounded-2xl sm:aspect-[5/6] lg:order-1 lg:aspect-auto lg:min-h-[28rem]">
          <Image
            src={media.features}
            alt="طالب يذاكر بهدوء"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:hidden">
            <p className="font-display text-lg font-bold text-white">
              تعلّم بثقة
            </p>
            <p className="mt-1 text-sm text-white/80">
              فيزياء واضحة — من التأسيس إلى الامتحان
            </p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="text-label-md uppercase text-primary">لماذا الملهم</p>
            <h2 className="text-headline-md mt-2 text-foreground">
              كل ما تحتاجه للفيزياء في مكان واحد
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              أدوات تعليمية واضحة، متابعة حقيقية، ومحتوى يبني ثقتك قبل الامتحان.
            </p>
          </Reveal>

          <Stagger className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2 sm:gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <StaggerItem key={title}>
                <div className="flex gap-3 sm:block">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary sm:size-11">
                    <Icon size={22} weight="duotone" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground sm:mt-3">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground sm:mt-1.5">
                      {description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
