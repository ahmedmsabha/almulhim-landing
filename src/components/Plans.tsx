"use client";

import { Check } from "@phosphor-icons/react";
import type { PublicPlan } from "@/lib/api";
import { brand } from "@/lib/brand";
import { captureLandingEvent } from "@/lib/posthog/capture";
import { cn, formatDurationDays, formatPrice } from "@/lib/utils";
import { LoadErrorState } from "./LoadErrorState";

type Props = {
  plans: PublicPlan[];
  loadError?: boolean;
};

export function Plans({ plans, loadError = false }: Props) {
  const subscribeUrl = `${brand.studentAppUrl.replace(/\/$/, "")}/subscription`;

  return (
    <section id="plans" className="border-b border-border py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-label-md uppercase text-primary">الباقات</p>
          <h2 className="text-headline-md mt-2 text-on-surface">
            اختر الباقة المناسبة لك
          </h2>
          <p className="mt-3 text-base leading-7 text-on-surface-variant">
            التصفّح هنا مجاني. الاشتراك يفتح الوصول الكامل للدروس والملخصات داخل
            تطبيق الطالب.
          </p>
        </div>

        {loadError ? (
          <div className="mx-auto max-w-lg">
            <LoadErrorState description="تعذر تحميل الباقات. تأكد من اتصال الخادم ثم أعد المحاولة." />
          </div>
        ) : plans.length === 0 ? (
          <div className="mx-auto mt-10 max-w-lg rounded-lg border border-dashed border-outline-variant bg-surface-container-lowest px-6 py-10 text-center">
            <p className="font-display font-semibold text-on-surface">
              لا توجد باقات منشورة حاليًا
            </p>
            <p className="mt-2 text-sm text-on-surface-variant">
              يمكنك المتابعة عبر تطبيق الطالب أو مراسلتنا من صفحة التواصل.
            </p>
            <a
              href={subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary"
            >
              الانتقال للاشتراك
            </a>
          </div>
        ) : (
          <ul className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, index) => {
              const featured = index === Math.min(1, plans.length - 1);
              return (
                <li
                  key={`${plan.name}-${plan.sortOrder}-${index}`}
                  className={cn(
                    "flex flex-col rounded-lg border bg-surface-container-lowest p-6",
                    featured
                      ? "border-primary shadow-[0_18px_40px_-28px_rgba(53,37,205,0.55)]"
                      : "border-border",
                  )}
                >
                  {featured ? (
                    <span className="text-label-md mb-3 inline-flex w-fit rounded-full bg-primary px-2 py-0.5 uppercase text-on-primary">
                      الأكثر اختيارًا
                    </span>
                  ) : null}
                  <h3 className="font-display text-xl font-bold text-on-surface">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    {formatDurationDays(plan.durationDays)}
                  </p>
                  <p className="mt-4 font-display text-3xl font-bold text-primary">
                    {formatPrice(plan.priceAmount, plan.currency)}
                  </p>
                  {plan.description ? (
                    <p className="mt-3 text-sm leading-6 text-on-surface-variant">
                      {plan.description}
                    </p>
                  ) : null}
                  <ul className="mt-5 space-y-2 text-sm text-on-surface-variant">
                    {[
                      "وصول لجميع الدروس المنشورة",
                      "ملخصات وملفات PDF",
                      "دعم ومتابعة عبر التطبيق",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check
                          size={18}
                          weight="bold"
                          className="mt-0.5 shrink-0 text-status-active"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={subscribeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      captureLandingEvent("plan_cta_click", {
                        planName: plan.name,
                      })
                    }
                    className={cn(
                      "mt-6 inline-flex justify-center rounded-md px-4 py-2.5 text-sm font-semibold transition-colors",
                      featured
                        ? "bg-primary text-on-primary hover:bg-primary-container"
                        : "border border-border text-on-surface hover:border-primary hover:text-primary",
                    )}
                  >
                    اشترك الآن
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
