"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Play } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { LessonPlayerDialog } from "@/components/LessonPlayerDialog";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PublicPreviewLesson } from "@/lib/api";
import { fetchPreviewLessonDetail } from "@/lib/api";
import { brand } from "@/lib/brand";
import { pickCover } from "@/lib/media";
import { captureLandingEvent } from "@/lib/posthog/capture";
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
  const reduce = useReducedMotion();
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
      setPlaybackUrl(null);
      setPlayerError(null);
      setLoadingId(null);
    }
  }

  const activeLesson = lessons.find((lesson) => lesson.id === activeId);

  return (
    <section id="preview" className="border-b border-border bg-section-wash py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-label-md uppercase text-primary">معاينة مجانية</p>
          <h2 className="text-headline-md mt-2 text-foreground">
            دروس تجريبية — تأسيس ومنهاج
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            جرّب أسلوب الشرح قبل الاشتراك. الدروس التجريبية متاحة بدون حساب أو
            تسجيل دخول.
          </p>
        </Reveal>

        {loadError ? (
          <LoadErrorState description="تعذر تحميل الدروس التجريبية. تأكد من اتصال الخادم ثم أعد المحاولة." />
        ) : lessons.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-outline-variant bg-card px-6 py-12 text-center">
            <p className="font-display text-lg font-semibold text-foreground">
              قريبًا دروس تجريبية جديدة
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              يمكنك تصفّح خريطة المنهج كاملة، أو فتح تطبيق الطالب عند توفر الدروس.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="outline" size="lg">
                <a href="#catalog">عرض المنهج</a>
              </Button>
              <Button asChild size="lg">
                <a
                  href={brand.studentAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  فتح تطبيق الطالب
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-10 space-y-12">
            {grouped.map((group) => (
              <div key={group.category}>
                <Reveal>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {categoryLabel[group.category]}
                  </h3>
                </Reveal>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((lesson, index) => {
                    const duration = formatDuration(lesson.totalDurationSeconds);
                    const cover = pickCover(lesson.id);
                    return (
                      <li key={lesson.id}>
                        <motion.div
                          initial={reduce ? false : { opacity: 0, y: 16 }}
                          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-20px" }}
                          transition={{ delay: index * 0.05, duration: 0.4 }}
                        >
                          <Card
                            className="group cursor-pointer overflow-hidden border-border/80 py-0 transition-shadow hover:shadow-lg"
                            onClick={() => void openLesson(lesson)}
                          >
                            <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/10]">
                              <Image
                                src={cover}
                                alt=""
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/20 to-transparent" />
                              <Badge className="absolute start-3 top-3 bg-status-active text-white hover:bg-status-active">
                                تجريبي
                              </Badge>
                              {/* Always visible on touch; stronger on hover/desktop */}
                              <span className="absolute inset-0 flex items-center justify-center opacity-90 transition-opacity group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                                <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg sm:size-12">
                                  <Play size={22} weight="fill" />
                                </span>
                              </span>
                              {duration ? (
                                <span className="absolute end-3 bottom-3 rounded-md bg-navy/70 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                                  {duration}
                                </span>
                              ) : null}
                            </div>
                            <CardHeader className="gap-1 px-3 pt-3 pb-1 sm:px-4 sm:pt-4">
                              <CardTitle className="font-display text-[0.95rem] leading-snug sm:text-base">
                                {lesson.title}
                              </CardTitle>
                              <CardDescription className="line-clamp-1">
                                {lesson.unitTitle} · {lesson.chapterTitle}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4">
                              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                                <Play size={16} weight="fill" />
                                {loadingId === lesson.id
                                  ? "جاري التحميل..."
                                  : "شاهد الآن"}
                              </span>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      <LessonPlayerDialog
        open={Boolean(activeId)}
        onOpenChange={onOpenChange}
        title={activeLesson?.title ?? ""}
        subtitle={activeLesson?.chapterTitle}
        playbackUrl={playbackUrl}
        loading={Boolean(loadingId && !playbackUrl && !playerError)}
        error={playerError}
      />
    </section>
  );
}
