"use client";

import { useMemo, useState } from "react";
import { Play } from "@phosphor-icons/react";
import { CoverImage } from "@/components/CoverImage";
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

function filterPreviewUnits(units: PublicCatalogUnit[]): PublicCatalogUnit[] {
  return units
    .map((unit) => ({
      ...unit,
      chapters: unit.chapters
        .map((chapter) => ({
          ...chapter,
          lessons: chapter.lessons.filter(
            (lesson) =>
              !lesson.isLocked && lesson.accessLevel === "preview",
          ),
        }))
        .filter((chapter) => chapter.lessons.length > 0),
    }))
    .filter((unit) => unit.chapters.length > 0);
}

export function Catalog({ units, loadError = false }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [playbackUrl, setPlaybackUrl] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [playerError, setPlayerError] = useState<string | null>(null);

  const previewUnits = useMemo(() => filterPreviewUnits(units), [units]);
  const subscribeUrl = `${brand.studentAppUrl.replace(/\/$/, "")}/subscription`;
  const hasContent = previewUnits.length > 0;
  const visibleUnits = previewUnits;

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
    <section id="catalog" className="border-b border-border py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-label-md uppercase text-primary">دروس مجانية</p>
          <h2 className="text-headline-md mt-2 text-foreground">
            اطّلع على بعض دروس المنهج التي تم نشرها مجانا للجميع
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            عيّنة من الوحدات والدروس المتاحة للجميع بدون اشتراك. شاهد المحتوى
            المفتوح هنا، والوصول الكامل للمنهج يكون بعد الاشتراك في الدورة.
          </p>
        </Reveal>

        {loadError ? (
          <LoadErrorState description="تعذر تحميل الدروس المجانية. تأكد من اتصال الخادم ثم أعد المحاولة." />
        ) : !hasContent ? (
          <div className="mt-10 rounded-xl border border-dashed border-outline-variant bg-card px-6 py-12 text-center">
            <p className="font-display text-lg font-semibold text-foreground">
              قريبًا دروس مجانية من المنهج
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              سيتم نشر عيّنات من الدروس هنا فور توفرها. يمكنك مشاهدة الدروس
              التجريبية أو الاشتراك للوصول الكامل.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="outline" size="lg">
                <a href="#preview">الدروس التجريبية</a>
              </Button>
              <Button asChild size="lg">
                <a href="#plans">الاشتراك في الدورة</a>
              </Button>
            </div>
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
                    {/* Mobile: full-bleed banner; desktop: side strip */}
                    <div className="relative h-28 w-full shrink-0 overflow-hidden sm:h-auto sm:w-36 sm:min-h-[7.5rem]">
                      <CoverImage
                        src={unit.coverUrl || pickCover(unit.id)}
                        sizes="(max-width: 640px) 100vw, 144px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-navy/25" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent sm:hidden" />
                      <div className="absolute inset-x-0 bottom-0 p-3 sm:hidden">
                        <p className="font-display text-base font-semibold text-white drop-shadow">
                          {unit.title}
                        </p>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <AccordionTrigger className="px-3 py-3 hover:no-underline sm:px-4 sm:py-4">
                        <div className="text-start">
                          <p className="hidden font-display text-lg font-semibold text-foreground sm:block">
                            {unit.title}
                          </p>
                          <p className="font-display text-sm font-semibold text-foreground sm:hidden">
                            عرض الدروس
                          </p>
                          {unit.description ? (
                            <p className="mt-1 line-clamp-2 text-sm font-normal text-muted-foreground">
                              {unit.description}
                            </p>
                          ) : null}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-3 pb-3 sm:px-4 sm:pb-4">
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
                                          className="flex w-full flex-col gap-2 px-3 py-3 text-start transition-colors hover:bg-muted/60 active:bg-muted/80 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:px-4"
                                        >
                                          <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                              <Badge className="bg-status-active text-white hover:bg-status-active">
                                                مجاني
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
            للوصول الكامل لجميع دروس المنهج،{" "}
            <a href="#plans" className="font-semibold text-primary hover:underline">
              اشترك في الدورة الخاصة
            </a>{" "}
            أو{" "}
            <a
              href={subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              افتح تطبيق الطالب
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
