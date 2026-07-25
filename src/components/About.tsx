import Image from "next/image";
import { brand } from "@/lib/brand";

export function About() {
  return (
    <section id="about" className="border-b border-border py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-label-md uppercase text-primary">عن المنصة</p>
          <h2 className="text-headline-md mt-2 text-on-surface">
            الملهم — شرح يبسّط الفيزياء ويبني الثقة
          </h2>
          <p className="mt-4 text-base leading-8 text-on-surface-variant">
            صُممت {brand.nameAr} لتكون رفيق طالب التوجيهي في الفيزياء: دروس
            منظمة، مراجعات مركّزة، وملخصات تلتقط جوهر المادة دون تعقيد زائد.
            نؤمن أن الفهم الواضح أهم من الحفظ العشوائي — لذلك نبني المحتوى حول
            المفاهيم، القوانين، ونمط أسئلة الامتحان.
          </p>
          <p className="mt-4 text-base leading-8 text-on-surface-variant">
            سواء كنت تبدأ من التأسيس أو تراجع المنهاج، ستجد مسارًا واضحًا
            ومتابعة مستمرة تساعدك تصل للامتحان وأنت مستعد.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden
            className="absolute -inset-4 rounded-2xl bg-secondary-container/50 blur-xl"
          />
          <div className="relative overflow-hidden rounded-xl border border-border bg-surface-container-lowest p-6">
            <Image
              src="/logo.jpg"
              alt={brand.shortNameAr}
              width={120}
              height={120}
              className="rounded-xl"
            />
            <p className="mt-5 font-display text-2xl font-bold text-on-surface">
              {brand.shortNameAr}
            </p>
            <p className="mt-2 text-sm leading-6 text-on-surface-variant">
              منصة تعليمية عربية لطلاب فلسطين — تركيز على الفيزياء، بأسلوب بسيط
              ومتقن.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
