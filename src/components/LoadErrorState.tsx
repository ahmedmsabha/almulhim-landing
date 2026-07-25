"use client";

import { useRouter } from "next/navigation";
import { ArrowsClockwise } from "@phosphor-icons/react";

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
    <div className="mt-10 rounded-lg border border-dashed border-error/40 bg-error-container/30 px-6 py-12 text-center">
      <p className="font-display text-lg font-semibold text-on-surface">{title}</p>
      <p className="mt-2 text-sm text-on-surface-variant">{description}</p>
      <button
        type="button"
        onClick={() => router.refresh()}
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-container"
      >
        <ArrowsClockwise size={18} weight="bold" />
        إعادة المحاولة
      </button>
    </div>
  );
}
