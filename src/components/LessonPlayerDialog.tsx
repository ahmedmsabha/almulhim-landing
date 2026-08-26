"use client";

import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string | null;
  playbackUrl: string | null;
  loading?: boolean;
  error?: string | null;
  variant?: "landscape" | "portrait";
};

const PORTRAIT_VIDEO_CLASS =
  "h-[min(82svh,calc(100vw*16/9))] w-full object-contain bg-black";

export function LessonPlayerDialog({
  open,
  onOpenChange,
  title,
  subtitle,
  playbackUrl,
  loading = false,
  error = null,
  variant = "landscape",
}: Props) {
  const isPortrait = variant === "portrait";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100%-1.5rem)] gap-0 p-0",
          isPortrait
            ? "max-h-[92svh] overflow-hidden bg-navy text-inverse-on-surface max-w-[min(100%,28rem)] sm:max-w-[min(100%,28rem)]"
            : "max-h-[90svh] overflow-y-auto sm:max-w-3xl",
        )}
      >
        <DialogHeader
          className={cn(
            "border-b px-4 text-start sm:px-5",
            isPortrait
              ? "border-white/10 py-2.5 sm:py-3"
              : "border-border py-3 sm:py-4",
          )}
        >
          <DialogTitle
            className={cn(
              "font-display text-base",
              isPortrait ? "text-white" : "sm:text-lg",
            )}
          >
            {title}
          </DialogTitle>
          {subtitle ? (
            <DialogDescription
              className={isPortrait ? "text-white/70" : undefined}
            >
              {subtitle}
            </DialogDescription>
          ) : null}
        </DialogHeader>

        {loading ? (
          <div
            className={cn(
              "flex items-center justify-center bg-navy text-sm text-inverse-on-surface/80",
              isPortrait ? PORTRAIT_VIDEO_CLASS : "aspect-video",
            )}
          >
            جاري التحميل...
          </div>
        ) : playbackUrl ? (
          <video
            key={playbackUrl}
            src={playbackUrl}
            controls
            autoPlay
            playsInline
            className={
              isPortrait ? PORTRAIT_VIDEO_CLASS : "aspect-video w-full bg-navy"
            }
          />
        ) : isPortrait ? (
          <div
            className={cn(
              "flex items-center justify-center px-6 text-center",
              PORTRAIT_VIDEO_CLASS,
            )}
          >
            <p className="text-sm text-white/80">
              {error ?? "تعذر تشغيل الفيديو حالياً. حاول لاحقاً."}
            </p>
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <p className="text-muted-foreground">
              {error ?? "افتح التطبيق لمشاهدة هذا الدرس التجريبي."}
            </p>
            <Button asChild className="mt-4" size="lg">
              <a
                href={brand.studentAppUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                فتح التطبيق
              </a>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
