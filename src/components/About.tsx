"use client";

import { Quotes } from "@phosphor-icons/react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const testimonials = [
  {
    quote:
      "شرح الأستاذ علي واضح جدًا — حسّيت إني فهمت الكهرباء لأول مرة بعد ما كنت أتعثر فيها. الدورة الأونلاين خلّتني أراجع براحتي وأسأل وقت ما بدّي.",
    name: "سارة أبو سالم",
    detail: "طالبة توجيهي — رام الله",
  },
  {
    quote:
      "أفضل شيء إن الدروس مرتّبة حسب المنهاج وفيها أسئلة وزارية. استفدت كثير من الحصص المسجّلة قبل الامتحان النهائي.",
    name: "محمد النتشة",
    detail: "طالب توجيهي — الخليل",
  },
  {
    quote:
      "كنت خايف من الفيزياء، بس أسلوب الأستاذ ببسّط المفاهيم الصعبة. مجموعة الدعم على واتساب ساعدتني أحل أسئلتي بسرعة.",
    name: "ليان حمدان",
    detail: "طالبة توجيهي — نابلس",
  },
  {
    quote:
      "الملخصات والاختبارات التراكمية فرقت معي كثير. أنصح أي طالب توجيهي يبدأ مع الملهم من بداية السنة.",
    name: "عمر جعبري",
    detail: "طالب توجيهي — جنين",
  },
] as const;

export function About() {
  return (
    <section id="about" className="border-b border-border bg-section-wash py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-label-md uppercase text-primary">آراء الطلاب</p>
          <h2 className="text-headline-md mt-2 text-foreground">
            آراء الطلبة بدورة الأونلاين
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            تجارب حقيقية من طلاب التوجيهي الذين تابعوا الدورة الأونلاين مع
            الأستاذ علي جودة.
          </p>
        </Reveal>

        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {testimonials.map(({ quote, name, detail }) => (
            <StaggerItem key={name}>
              <figure className="flex h-full flex-col rounded-xl border border-border bg-card p-5 sm:p-6">
                <Quotes
                  size={28}
                  weight="fill"
                  className="text-primary/40"
                  aria-hidden
                />
                <blockquote className="mt-3 flex-1 text-base leading-7 text-foreground">
                  {quote}
                </blockquote>
                <figcaption className="mt-4 border-t border-border pt-4">
                  <p className="font-display font-semibold text-foreground">
                    {name}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {detail}
                  </p>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
