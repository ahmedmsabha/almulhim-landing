"use client";

import { useState } from "react";
import { PlayCircle } from "@phosphor-icons/react";

import { LessonPlayerDialog } from "@/components/LessonPlayerDialog";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import type { PublicHomeVideo } from "@/lib/api";

type HomeVideosProps = {
  videos: PublicHomeVideo[];
  loadError?: boolean;
};

export function HomeVideos({ videos, loadError = false }: HomeVideosProps) {
  const [active, setActive] = useState<PublicHomeVideo | null>(null);

  if (!loadError && videos.length === 0) {
    return null;
  }

  return (
    <section
      id="home-videos"
      className="border-b border-border py-12 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-label-md uppercase text-primary">تعرف علينا</p>
          <h2 className="text-headline-md mt-2 text-foreground">
            فيديوهات تعريفية
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            شاهد كيف ندرّس أونلاين، وكيف تستخدم التطبيق، ولوحات شرف طلاب غزة
            والضفة.
          </p>
        </Reveal>

        {loadError ? (
          <p className="mt-10 text-center text-muted-foreground">
            تعذر تحميل الفيديوهات حالياً. حاول لاحقاً.
          </p>
        ) : (
          <Stagger className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {videos.map((video) => (
              <StaggerItem key={video.id}>
                <button
                  type="button"
                  onClick={() => setActive(video)}
                  className="flex h-full w-full flex-col rounded-2xl border border-border bg-card p-5 text-start transition-colors hover:border-primary/40 hover:bg-secondary/40"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <PlayCircle size={28} weight="duotone" aria-hidden />
                  </span>
                  <span className="mt-4 font-display text-base font-semibold text-foreground">
                    {video.title}
                  </span>
                  <span className="mt-2 text-sm text-muted-foreground">
                    اضغط للمشاهدة
                  </span>
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>

      <LessonPlayerDialog
        open={active != null}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
        title={active?.title ?? ""}
        playbackUrl={active?.playbackUrl ?? null}
      />
    </section>
  );
}
