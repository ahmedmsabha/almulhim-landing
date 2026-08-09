"use client";

import { Medal, Trophy } from "@phosphor-icons/react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/badge";

const honorees = [
  { name: "أحمد الخطيب", score: "98%", year: "2025" },
  { name: "مريم عودة", score: "96%", year: "2025" },
  { name: "يوسف شاهين", score: "95%", year: "2024" },
  { name: "رنا مصلح", score: "94%", year: "2024" },
  { name: "كريم زيدان", score: "93%", year: "2025" },
  { name: "دانا أبو عمر", score: "92%", year: "2024" },
  { name: "طارق حمد", score: "91%", year: "2025" },
  { name: "هبة سلامة", score: "90%", year: "2024" },
] as const;

export function SuccessBoard() {
  return (
    <section id="success" className="border-b border-border py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-label-md uppercase text-primary">نجاحاتنا</p>
          <h2 className="text-headline-md mt-2 text-foreground">لوحة الشرف</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            طلابنا المتفوّقون في امتحان الفيزياء — نفتخر بإنجازاتهم ونشاركهم
            فرحة النجاح.
          </p>
        </Reveal>

        <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {honorees.map((student, index) => (
            <StaggerItem key={student.name}>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 sm:px-5 sm:py-4">
                <span
                  className={`inline-flex size-10 shrink-0 items-center justify-center rounded-lg ${
                    index < 3
                      ? "bg-gold/15 text-gold"
                      : "bg-secondary text-primary"
                  }`}
                >
                  {index < 3 ? (
                    <Trophy size={22} weight="duotone" />
                  ) : (
                    <Medal size={22} weight="duotone" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display font-semibold text-foreground">
                    {student.name}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {student.score}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {student.year}
                    </span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
