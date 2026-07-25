"use client";

import { useMemo, useState } from "react";
import { Play, X } from "@phosphor-icons/react";
import type { PublicPreviewLesson } from "@/lib/api";
import { fetchPreviewLessonDetail } from "@/lib/api";
import { brand } from "@/lib/brand";
import { captureLandingEvent } from "@/lib/posthog/capture";
import { cn } from "@/lib/utils";
import { LoadErrorState } from "./LoadErrorState";

type Props = {
  lessons: PublicPreviewLesson[];
  loadError?: boolean;
};

const categoryLabel: Record<PublicPreviewLesson["category"], string> = {
  foundation: "دروس التأسيس",
  curriculum: "دروس المنهاج",
  other: "دروس تجريبية",
};

function formatDuration(total: number | null): string | null {
  if (total == null || total <= 0) return null;
  const minutes = Math.round(total / 60);
  if (minutes < 60) return `${minutes} د`;
  const hours = Math.floor(minutes / 60);
  const rem = minutes % 60;
  return rem ? `${hours} س ${rem} د` : `${hours} س`;
}

export function PreviewLessons({ lessons, loadError = false }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playbackUrl, setPlaybackUrl] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [playerError, setPlayerError] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const order: PublicPreviewLesson["category"][] = [
      "foundation",
      "curriculum",
      "other",
    ];
    return order
      .map((category) => ({
        category,
        items: lessons.filter((lesson) => lesson.category === category),
      }))
      .filter((group) => group.items.length > 0);
  }, [lessons]);

  async function openLesson(lesson: PublicPreviewLesson) {
    captureLandingEvent("preview_lesson_open", { lessonId: lesson.id });
    setPlayerError(null);
    setLoadingId(lesson.id);
    setActiveId(lesson.id);

    const detail = await fetchPreviewLessonDetail(lesson.id);
    setLoadingId(null);

    if (detail?.playbackUrl) {
      setPlaybackUrl(detail.playbackUrl);
      return;
    }

    setPlaybackUrl(null);
    setPlayerError("افتح التطبيق لمشاهدة هذا الدرس التجريبي.");
  }

  function closePlayer() {
    setActiveId(null);
    setPlaybackUrl(null);
    setPlayerError(null);
  }

  const activeLesson = lessons.find((lesson) => lesson.id === activeId);

  return (
    <section id="preview" className="border-b border-border bg-surface-container-low/50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-label-md uppercase text-primary">معاينة مجانية</p>
          <h2 className="text-headline-md mt-2 text-on-surface">
            دروس تجريبية — تأسيس ومنهاج
          </h2>
          <p className="mt-3 text-base leading-7 text-on-surface-variant">
            جرّب أسلوب الشرح قبل الاشتراك. الدروس التجريبية متاحة بدون حساب أو
            تسجيل دخول.
          </p>
        </div>

        {loadError ? (
          <LoadErrorState description="تعذر تحميل الدروس التجريبية. تأكد من اتصال الخادم ثم أعد المحاولة." />
        ) : lessons.length === 0 ? (
          <div className="mt-10 rounded-lg border border-dashed border-outline-variant bg-surface-container-lowest px-6 py-12 text-center">
            <p className="font-display text-lg font-semibold text-on-surface">
              قريبًا دروس تجريبية جديدة
            </p>
            <p className="mt-2 text-sm text-on-surface-variant">
              يمكنك تصفّح خريطة المنهج كاملة، أو فتح تطبيق الطالب عند توفر الدروس.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#catalog"
                className="inline-flex rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-on-surface hover:border-primary hover:text-primary"
              >
                عرض المنهج
              </a>
              <a
                href={brand.studentAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary"
              >
                فتح تطبيق الطالب
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-10 space-y-10">
            {grouped.map((group) => (
              <div key={group.category}>
                <h3 className="font-display text-lg font-semibold text-on-surface">
                  {categoryLabel[group.category]}
                </h3>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((lesson) => {
                    const duration = formatDuration(lesson.totalDurationSeconds);
                    return (
                      <li key={lesson.id}>
                        <button
                          type="button"
                          onClick={() => void openLesson(lesson)}
                          className={cn(
                            "flex h-full w-full flex-col rounded-lg border border-border bg-surface-container-lowest p-5 text-start transition-all hover:-translate-y-0.5 hover:border-primary",
                            activeId === lesson.id && "border-primary",
                          )}
                        >
                          <span className="text-label-md inline-flex w-fit rounded-full bg-status-active-bg px-2 py-0.5 uppercase text-status-active">
                            تجريبي
                          </span>
                          <span className="mt-3 font-display text-base font-semibold text-on-surface">
                            {lesson.title}
                          </span>
                          <span className="mt-1 text-sm text-on-surface-variant">
                            {lesson.unitTitle} · {lesson.chapterTitle}
                          </span>
                          <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                            <Play size={16} weight="fill" />
                            {loadingId === lesson.id
                              ? "جاري التحميل..."
                              : duration
                                ? `شاهد · ${duration}`
                                : "شاهد الآن"}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {(playbackUrl || playerError) && activeLesson ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-inverse-surface/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={activeLesson.title}
        >
          <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-surface-container-lowest shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <p className="font-display font-semibold text-on-surface">
                  {activeLesson.title}
                </p>
                <p className="text-xs text-on-surface-variant">
                  {activeLesson.chapterTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={closePlayer}
                className="rounded-md border border-border p-2 text-on-surface"
                aria-label="إغلاق"
              >
                <X size={18} />
              </button>
            </div>
            {playbackUrl ? (
              <video
                key={playbackUrl}
                src={playbackUrl}
                controls
                autoPlay
                className="aspect-video w-full bg-inverse-surface"
              />
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-on-surface-variant">{playerError}</p>
                <a
                  href={brand.studentAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary"
                >
                  فتح التطبيق
                </a>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
