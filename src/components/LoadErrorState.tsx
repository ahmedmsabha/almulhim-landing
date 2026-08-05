"use client";

import { useRouter } from "next/navigation";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

type Props = {
  title?: string;
  description?: string;
};

export function LoadErrorState({
  title = "تعذر التحميل",
  description = "حدثت مشكلة أثناء جلب البيانات. حاول مرة أخرى.",
}: Props) {
  const router = useRouter();

  return (
    <div className="mt-10 rounded-xl border border-dashed border-destructive/40 bg-destructive/5 px-6 py-12 text-center">
      <p className="font-display text-lg font-semibold text-foreground">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <Button
        type="button"
        size="lg"
        className="mt-6 gap-2"
        onClick={() => router.refresh()}
      >
        <ArrowsClockwise size={18} weight="bold" />
        إعادة المحاولة
      </Button>
    </div>
  );
}
