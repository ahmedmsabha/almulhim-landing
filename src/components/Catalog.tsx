"use client";

import { useState } from "react";
import { Lock, Play, X } from "@phosphor-icons/react";
import type { PublicCatalogUnit } from "@/lib/api";
import { fetchPreviewLessonDetail } from "@/lib/api";
import { brand } from "@/lib/brand";
import { captureLandingEvent } from "@/lib/posthog/capture";
import { cn } from "@/lib/utils";
import { LoadErrorState } from "./LoadErrorState";

type Props = {
  units: PublicCatalogUnit[];
  loadError?: boolean;
};

export function Catalog({ units, loadError = false }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [playbackUrl, setPlaybackUrl] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [playerError, setPlayerError] = useState<string | null>(null);

  const subscribeUrl = `${brand.studentAppUrl.replace(/\/$/, "")}/subscription`;
  const hasContent = units.some((unit) =>
    unit.chapters.some((chapter) => chapter.lessons.length > 0),
  );

  async function openPreview(lesson: {
    id: string;
    title: string;
    chapterTitle: string;
  }) {
    captureLandingEvent("catalog_preview_open", { lessonId: lesson.id });
    setPlayerError(null);
    setLoadingId(lesson.id);
    setActiveId(lesson.id);
    setActiveTitle(lesson.title);
    setActiveChapter(lesson.chapterTitle);

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
    setActiveTitle(null);
    setActiveChapter(null);
    setPlaybackUrl(null);
    setPlayerError(null);
  }

  return (
    <section id="catalog" className="border-b border-border py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-label-md uppercase text-primary">خريطة المنهج</p>
          <h2 className="text-headline-md mt-2 text-on-surface">
            اطّلع على المنهج كاملًا قبل الاشتراك
          </h2>
          <p className="mt-3 text-base leading-7 text-on-surface-variant">
            تصفّح الوحدات والدروس بدون حساب. الدروس التجريبية متاحة للمشاهدة،
            والباقي يُفتح بعد الاشتراك.
          </p>
        </div>

        {loadError ? (
          <LoadErrorState description="تعذر تحميل خريطة المنهج. تأكد من اتصال الخادم ثم أعد المحاولة." />
        ) : !hasContent ? (
          <div className="mt-10 rounded-lg border border-dashed border-outline-variant bg-surface-container-lowest px-6 py-12 text-center">
            <p className="font-display text-lg font-semibold text-on-surface">
              قريبًا خريطة المنهج الكاملة
            </p>
            <p className="mt-2 text-sm text-on-surface-variant">
              سيتم عرض الوحدات والدروس هنا فور نشرها من لوحة الإدارة.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-8">
            {units.map((unit) => {
              if (unit.chapters.every((chapter) => chapter.lessons.length === 0)) {
                return null;
              }

              return (
                <article key={unit.id}>
                  <div className="border-b border-border pb-3">
                    <h3 className="font-display text-xl font-semibold text-on-surface">
                      {unit.title}
                    </h3>
                    {unit.description ? (
                      <p className="mt-1 text-sm text-on-surface-variant">
                        {unit.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-5 space-y-6">
                    {unit.chapters.map((chapter) => {
                      if (chapter.lessons.length === 0) return null;

                      return (
                        <div key={chapter.id}>
                          <h4 className="text-sm font-semibold text-on-surface-variant">
                            {chapter.title}
                          </h4>
                          <ul className="mt-3 divide-y divide-border rounded-lg border border-border bg-surface-container-lowest">
                            {chapter.lessons.map((lesson) => {
                              const meta = [
                                lesson.videoCount > 0
                                  ? `${lesson.videoCount} فيديو`
                                  : null,
                                lesson.pdfCount > 0
                                  ? `${lesson.pdfCount} ملف`
                                  : null,
                              ]
                                .filter(Boolean)
                                .join(" · ");

                              if (lesson.isLocked) {
                                return (
                                  <li
                                    key={lesson.id}
                                    className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
                                  >
                                    <div className="min-w-0">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-label-md inline-flex items-center gap-1 rounded-full bg-surface-container px-2 py-0.5 text-on-surface-variant">
                                          <Lock size={12} weight="bold" />
                                          مقفل
                                        </span>
                                        <span className="font-medium text-on-surface">
                                          {lesson.title}
                                        </span>
                                      </div>
                                      {meta ? (
                                        <p className="mt-1 text-xs text-on-surface-variant">
                                          {meta}
                                        </p>
                                      ) : null}
                                    </div>
                                    <a
                                      href="#plans"
                                      onClick={() =>
                                        captureLandingEvent(
                                          "catalog_subscribe_cta",
                                          { lessonId: lesson.id },
                                        )
                                      }
                                      className="shrink-0 text-sm font-semibold text-primary hover:underline"
                                    >
                                      اشترك للوصول
                                    </a>
                                  </li>
                                );
                              }

                              return (
                                <li key={lesson.id}>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      void openPreview({
                                        id: lesson.id,
                                        title: lesson.title,
                                        chapterTitle: chapter.title,
                                      })
                                    }
                                    className={cn(
                                      "flex w-full flex-wrap items-center justify-between gap-3 px-4 py-3 text-start transition-colors hover:bg-surface-container-low",
                                      activeId === lesson.id &&
                                        "bg-secondary-container/40",
                                    )}
                                  >
                                    <div className="min-w-0">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-label-md inline-flex rounded-full bg-status-active-bg px-2 py-0.5 uppercase text-status-active">
                                          تجريبي
                                        </span>
                                        <span className="font-medium text-on-surface">
                                          {lesson.title}
                                        </span>
                                      </div>
                                      {meta ? (
                                        <p className="mt-1 text-xs text-on-surface-variant">
                                          {meta}
                                        </p>
                                      ) : null}
                                    </div>
                                    <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary">
                                      <Play size={14} weight="fill" />
                                      {loadingId === lesson.id
                                        ? "جاري التحميل..."
                                        : "شاهد"}
                                    </span>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!loadError && hasContent ? (
          <p className="mt-8 text-center text-sm text-on-surface-variant">
            الوصول الكامل للدروس المقفلّة عبر{" "}
            <a href="#plans" className="font-semibold text-primary hover:underline">
              الباقات
            </a>{" "}
            أو{" "}
            <a
              href={subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              تطبيق الطالب
            </a>
            .
          </p>
        ) : null}
      </div>

      {(playbackUrl || playerError) && activeTitle ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-inverse-surface/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={activeTitle}
        >
          <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-surface-container-lowest shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <p className="font-display font-semibold text-on-surface">
                  {activeTitle}
                </p>
                {activeChapter ? (
                  <p className="text-xs text-on-surface-variant">{activeChapter}</p>
                ) : null}
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
