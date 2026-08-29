"use client";

import { useState } from "react";
import { PlayCircle } from "@phosphor-icons/react";

import { LessonPlayerDialog } from "@/components/LessonPlayerDialog";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import type { PublicHomeVideo } from "@/lib/api";
import { fetchHomeVideosFresh } from "@/lib/api";
import {
  HOME_VIDEO_TITLE_COLOR_CLASS,
  HOME_VIDEO_TITLE_SIZE_CLASS,
  resolveTitleLines,
} from "@/lib/home-video-title";
import { captureLandingEvent } from "@/lib/posthog/capture";

type HomeVideosProps = {
  videos: PublicHomeVideo[];
  loadError?: boolean;
};

function firstFrameSrc(url: string): string {
  const hashIndex = url.indexOf("#");
  const base = hashIndex === -1 ? url : url.slice(0, hashIndex);
  return `${base}#t=0.1`;
}

export function HomeVideos({ videos, loadError = false }: HomeVideosProps) {
  const [active, setActive] = useState<PublicHomeVideo | null>(null);
  const [playbackUrl, setPlaybackUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [playerError, setPlayerError] = useState<string | null>(null);

  if (!loadError && videos.length === 0) {
    return null;
  }

  async function openVideo(video: PublicHomeVideo) {
    captureLandingEvent("home_video_open", { videoId: video.id });
    setPlayerError(null);
    setActive(video);
    setPlaybackUrl(null);
    setLoading(true);

    const result = await fetchHomeVideosFresh();
    setLoading(false);

    const fresh = result.data.find((item) => item.id === video.id);
    if (fresh?.playbackUrl) {
      setActive(fresh);
      setPlaybackUrl(fresh.playbackUrl);
      return;
    }

    if (video.playbackUrl) {
      setPlaybackUrl(video.playbackUrl);
      return;
    }

    setPlayerError("تعذر تشغيل الفيديو حالياً. حاول لاحقاً.");
  }

  return (
    <section
      id="home-videos"
      className="scroll-mt-16 border-b border-border py-12 sm:py-20"
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
          <Stagger className="mx-auto mt-10 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {videos.map((video) => (
              <StaggerItem key={video.id}>
                <button
                  type="button"
                  onClick={() => {
                    void openVideo(video);
                  }}
                  className="group flex w-full flex-col text-start"
                >
                  <span className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-border bg-navy">
                    <video
                      src={firstFrameSrc(video.playbackUrl)}
                      muted
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                      onLoadedMetadata={(event) => {
                        const el = event.currentTarget;
                        if (el.currentTime < 0.05) {
                          el.currentTime = 0.1;
                        }
                      }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                      <PlayCircle
                        size={52}
                        weight="fill"
                        className="text-white"
                        aria-hidden
                      />
                    </span>
                  </span>
                  <span className="mt-3 flex flex-col font-display font-semibold">
                    {resolveTitleLines(video).map((line, index) => (
                      <span
                        key={index}
                        className={`${HOME_VIDEO_TITLE_SIZE_CLASS[line.size]} ${HOME_VIDEO_TITLE_COLOR_CLASS[line.color]}`}
                      >
                        {line.text}
                      </span>
                    ))}
                  </span>
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>

      <LessonPlayerDialog
        variant="portrait"
        open={active != null}
        onOpenChange={(open) => {
          if (!open) {
            setActive(null);
            setPlaybackUrl(null);
            setPlayerError(null);
            setLoading(false);
          }
        }}
        title={active?.title ?? ""}
        playbackUrl={playbackUrl}
        loading={loading}
        error={playerError}
      />
    </section>
  );
}
