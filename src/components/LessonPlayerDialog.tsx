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

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string | null;
  playbackUrl: string | null;
  loading?: boolean;
  error?: string | null;
};

export function LessonPlayerDialog({
  open,
  onOpenChange,
  title,
  subtitle,
  playbackUrl,
  loading = false,
  error = null,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-3xl">
        <DialogHeader className="border-b border-border px-5 py-4 text-start">
          <DialogTitle className="font-display text-lg">{title}</DialogTitle>
          {subtitle ? (
            <DialogDescription>{subtitle}</DialogDescription>
          ) : null}
        </DialogHeader>

        {loading ? (
          <div className="flex aspect-video items-center justify-center bg-navy text-sm text-inverse-on-surface/80">
            جاري التحميل...
          </div>
        ) : playbackUrl ? (
          <video
            key={playbackUrl}
            src={playbackUrl}
            controls
            autoPlay
            className="aspect-video w-full bg-navy"
          />
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
