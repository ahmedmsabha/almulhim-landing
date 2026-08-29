import type {
  HomeVideoTitleColor,
  HomeVideoTitleLine,
  HomeVideoTitleSize,
  PublicHomeVideo,
} from "@/lib/api";

export const HOME_VIDEO_TITLE_SIZE_CLASS: Record<HomeVideoTitleSize, string> = {
  sm: "text-xs sm:text-sm",
  md: "text-sm sm:text-base",
  lg: "text-headline-sm",
  xl: "text-headline-md",
};

export const HOME_VIDEO_TITLE_COLOR_CLASS: Record<HomeVideoTitleColor, string> =
  {
    default: "text-foreground",
    muted: "text-muted-foreground",
    primary: "text-primary",
    gold: "text-gold",
  };

/** Videos created before styled lines existed carry only a plain `title`. */
export function resolveTitleLines(
  video: Pick<PublicHomeVideo, "title" | "titleLines">,
): HomeVideoTitleLine[] {
  if (video.titleLines && video.titleLines.length > 0) {
    return video.titleLines;
  }
  return [{ text: video.title, size: "md", color: "default" }];
}
