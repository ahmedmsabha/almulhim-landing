"use client";

import { Check } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  const reduce = useReducedMotion();
  const subscribeUrl = `${brand.studentAppUrl.replace(/\/$/, "")}/subscription`;

  return (
    <section
      id="plans"
      className="border-b border-border bg-navy py-16 text-inverse-on-surface sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-label-md uppercase text-gold">الباقات</p>
          <h2 className="text-headline-md mt-2 text-white">
            اختر الباقة المناسبة لك
          </h2>
          <p className="mt-3 text-base leading-7 text-white/70">
            التصفّح هنا مجاني. الاشتراك يفتح الوصول الكامل للدروس والملخصات داخل
            تطبيق الطالب.
          </p>
        </Reveal>

        {loadError ? (
          <div className="mx-auto max-w-lg [&_.border-dashed]:border-white/20 [&_.text-foreground]:text-white [&_.text-muted-foreground]:text-white/70">
            <LoadErrorState description="تعذر تحميل الباقات. تأكد من اتصال الخادم ثم أعد المحاولة." />
          </div>
        ) : plans.length === 0 ? (
          <div className="mx-auto mt-10 max-w-lg rounded-xl border border-dashed border-white/25 bg-white/5 px-6 py-10 text-center">
            <p className="font-display font-semibold text-white">
              لا توجد باقات منشورة حاليًا
            </p>
            <p className="mt-2 text-sm text-white/70">
              يمكنك المتابعة عبر تطبيق الطالب أو مراسلتنا من صفحة التواصل.
            </p>
            <Button asChild size="lg" className="mt-5 bg-gold text-navy hover:bg-gold-soft">
              <a href={subscribeUrl} target="_blank" rel="noopener noreferrer">
                الانتقال للاشتراك
              </a>
            </Button>
          </div>
        ) : (
          <ul className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, index) => {
              const featured = index === Math.min(1, plans.length - 1);
              return (
                <li key={`${plan.name}-${plan.sortOrder}-${index}`}>
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.45 }}
                    whileHover={reduce ? undefined : { y: -4 }}
                    className="h-full"
                  >
                    <Card
                      className={cn(
                        "h-full border-white/10 bg-white/5 text-white shadow-none",
                        featured &&
                          "border-gold/60 bg-white/10 ring-1 ring-gold/40",
                      )}
                    >
                      <CardHeader>
                        {featured ? (
                          <Badge className="mb-1 w-fit bg-gold text-navy hover:bg-gold">
                            موصى به
                          </Badge>
                        ) : null}
                        <CardTitle className="font-display text-xl text-white">
                          {plan.name}
                        </CardTitle>
                        <CardDescription className="text-white/65">
                          {formatDurationDays(plan.durationDays)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="font-display text-3xl font-bold text-gold">
                          {formatPrice(plan.priceAmount, plan.currency)}
                        </p>
                        {plan.description ? (
                          <p className="mt-3 text-sm leading-6 text-white/70">
                            {plan.description}
                          </p>
                        ) : null}
                        <ul className="mt-5 space-y-2 text-sm text-white/75">
                          {[
                            "وصول لجميع الدروس المنشورة",
                            "ملخصات وملفات PDF",
                            "دعم ومتابعة عبر التطبيق",
                          ].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <Check
                                size={18}
                                weight="bold"
                                className="mt-0.5 shrink-0 text-gold"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="border-white/10 bg-transparent">
                        <Button
                          asChild
                          size="lg"
                          className={cn(
                            "w-full",
                            featured
                              ? "bg-gold text-navy hover:bg-gold-soft"
                              : "border-white/25 bg-transparent text-white hover:bg-white/10",
                          )}
                          variant={featured ? "default" : "outline"}
                        >
                          <a
                            href={subscribeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              captureLandingEvent("plan_cta_click", {
                                planName: plan.name,
                              })
                            }
                          >
                            اشترك الآن
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
