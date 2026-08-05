"use client";

import { useEffect, useRef, useState } from "react";
import {
  Books,
  ClipboardText,
  Question,
  UsersThree,
} from "@phosphor-icons/react";
import { useInView, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";

const stats = [
  { icon: Books, target: 120, prefix: "+", label: "درس شامل" },
  { icon: Question, target: 2000, prefix: "+", label: "سؤال تدريبي" },
  { icon: ClipboardText, target: 50, prefix: "+", label: "اختبار تراكمي" },
  { icon: UsersThree, target: 10, prefix: "+", suffix: "K", label: "طالب استفاد" },
] as const;

function useCountUp(target: number, active: boolean, reduce: boolean | null) {
  const [value, setValue] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setValue(target);
      return;
    }

    const duration = 1200;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduce, target]);

  return value;
}

function StatItem({
  icon: Icon,
  target,
  prefix,
  suffix,
  label,
}: {
  icon: typeof Books;
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const value = useCountUp(target, inView, reduce);

  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="inline-flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
        <Icon size={24} weight="duotone" />
      </span>
      <div>
        <p className="font-display text-xl font-bold text-primary tabular-nums">
          {prefix}
          {value}
          {suffix}
        </p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="border-b border-border bg-card">
      <Reveal>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
