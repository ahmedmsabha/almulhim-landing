"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { brand } from "@/lib/brand";
import { media } from "@/lib/media";

export function About() {
  return (
    <section id="about" className="border-b border-border bg-section-wash py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <p className="text-label-md uppercase text-primary">عن المنصة</p>
          <h2 className="text-headline-md mt-2 text-foreground">
            الملهم — شرح يبسّط الفيزياء ويبني الثقة
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            صُممت {brand.nameAr} لتكون رفيق طالب التوجيهي في الفيزياء: دروس
            منظمة، مراجعات مركّزة، وملخصات تلتقط جوهر المادة دون تعقيد زائد.
            نؤمن أن الفهم الواضح أهم من الحفظ العشوائي — لذلك نبني المحتوى حول
            المفاهيم، القوانين، ونمط أسئلة الامتحان.
          </p>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            سواء كنت تبدأ من التأسيس أو تراجع المنهاج، ستجد مسارًا واضحًا
            ومتابعة مستمرة تساعدك تصل للامتحان وأنت مستعد.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[5/4]">
          <Image
            src={media.about}
            alt="بيئة تعليمية"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="font-display text-2xl font-bold text-white">
              {brand.shortNameAr}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-white/80">
              منصة تعليمية عربية لطلاب فلسطين — تركيز على الفيزياء، بأسلوب بسيط
              ومتقن.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
