"use client";

import Image from "next/image";
import { useState } from "react";
import { Lock, Play } from "@phosphor-icons/react";
import { LessonPlayerDialog } from "@/components/LessonPlayerDialog";
import { Reveal } from "@/components/motion/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PublicCatalogUnit } from "@/lib/api";
import { fetchPreviewLessonDetail } from "@/lib/api";
import { brand } from "@/lib/brand";
import { pickCover } from "@/lib/media";
import { captureLandingEvent } from "@/lib/posthog/capture";
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

  const visibleUnits = units.filter(
    (unit) => !unit.chapters.every((chapter) => chapter.lessons.length === 0),
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
    setPlaybackUrl(null);

    const detail = await fetchPreviewLessonDetail(lesson.id);
    setLoadingId(null);

    if (detail?.playbackUrl) {
      setPlaybackUrl(detail.playbackUrl);
      return;
    }

    setPlaybackUrl(null);
    setPlayerError("افتح التطبيق لمشاهدة هذا الدرس التجريبي.");
  }

  function onOpenChange(open: boolean) {
    if (!open) {
      setActiveId(null);
      setActiveTitle(null);
      setActiveChapter(null);
      setPlaybackUrl(null);
      setPlayerError(null);
      setLoadingId(null);
    }
  }

  return (
    <section id="catalog" className="border-b border-border py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-label-md uppercase text-primary">خريطة المنهج</p>
          <h2 className="text-headline-md mt-2 text-foreground">
            اطّلع على المنهج كاملًا قبل الاشتراك
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            تصفّح الوحدات والدروس بدون حساب. الدروس التجريبية متاحة للمشاهدة،
            والباقي يُفتح بعد الاشتراك.
          </p>
        </Reveal>

        {loadError ? (
          <LoadErrorState description="تعذر تحميل خريطة المنهج. تأكد من اتصال الخادم ثم أعد المحاولة." />
        ) : !hasContent ? (
          <div className="mt-10 rounded-xl border border-dashed border-outline-variant bg-card px-6 py-12 text-center">
            <p className="font-display text-lg font-semibold text-foreground">
              قريبًا خريطة المنهج الكاملة
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              سيتم عرض الوحدات والدروس هنا فور نشرها من لوحة الإدارة.
            </p>
          </div>
        ) : (
          <Reveal className="mt-10" delay={0.08}>
            <Accordion
              type="multiple"
              defaultValue={visibleUnits.slice(0, 1).map((u) => u.id)}
              className="space-y-3"
            >
              {visibleUnits.map((unit) => (
                <AccordionItem
                  key={unit.id}
                  value={unit.id}
                  className="overflow-hidden rounded-xl border border-border bg-card px-0 last:border-b"
                >
                  <div className="flex flex-col sm:flex-row sm:items-stretch">
                    <div className="relative hidden w-36 shrink-0 overflow-hidden sm:block">
                      <Image
                        src={pickCover(unit.id)}
                        alt=""
                        fill
                        sizes="144px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-navy/25" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <AccordionTrigger className="px-4 py-4 hover:no-underline">
                        <div className="text-start">
                          <p className="font-display text-lg font-semibold text-foreground">
                            {unit.title}
                          </p>
                          {unit.description ? (
                            <p className="mt-1 text-sm font-normal text-muted-foreground">
                              {unit.description}
                            </p>
                          ) : null}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="space-y-5">
                          {unit.chapters.map((chapter) => {
                            if (chapter.lessons.length === 0) return null;

                            return (
                              <div key={chapter.id}>
                                <h4 className="text-sm font-semibold text-muted-foreground">
                                  {chapter.title}
                                </h4>
                                <ul className="mt-2 divide-y divide-border overflow-hidden rounded-lg border border-border">
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
                                              <Badge
                                                variant="secondary"
                                                className="gap-1"
                                              >
                                                <Lock size={12} weight="bold" />
                                                مقفل
                                              </Badge>
                                              <span className="font-medium text-foreground">
                                                {lesson.title}
                                              </span>
                                            </div>
                                            {meta ? (
                                              <p className="mt-1 text-xs text-muted-foreground">
                                                {meta}
                                              </p>
                                            ) : null}
                                          </div>
                                          <Button
                                            asChild
                                            variant="link"
                                            className="h-auto px-0"
                                          >
                                            <a
                                              href="#plans"
                                              onClick={() =>
                                                captureLandingEvent(
                                                  "catalog_subscribe_cta",
                                                  { lessonId: lesson.id },
                                                )
                                              }
                                            >
                                              اشترك للوصول
                                            </a>
                                          </Button>
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
                                          className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-3 text-start transition-colors hover:bg-muted/60"
                                        >
                                          <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                              <Badge className="bg-status-active text-white hover:bg-status-active">
                                                تجريبي
                                              </Badge>
                                              <span className="font-medium text-foreground">
                                                {lesson.title}
                                              </span>
                                            </div>
                                            {meta ? (
                                              <p className="mt-1 text-xs text-muted-foreground">
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
                      </AccordionContent>
                    </div>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        )}

        {!loadError && hasContent ? (
          <p className="mt-8 text-center text-sm text-muted-foreground">
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

      <LessonPlayerDialog
        open={Boolean(activeTitle)}
        onOpenChange={onOpenChange}
        title={activeTitle ?? ""}
        subtitle={activeChapter}
        playbackUrl={playbackUrl}
        loading={Boolean(loadingId && !playbackUrl && !playerError)}
        error={playerError}
      />
    </section>
  );
}
