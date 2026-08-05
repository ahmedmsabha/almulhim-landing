"use client";

import Image from "next/image";

type CoverImageProps = {
  src: string;
  alt?: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/**
 * Next/Image for curated Unsplash; plain img for signed R2/API covers
 * (query-signed hosts aren't in remotePatterns).
 */
export function CoverImage({
  src,
  alt = "",
  sizes,
  className,
  priority,
}: CoverImageProps) {
  const isUnsplash = src.includes("images.unsplash.com");

  if (isUnsplash) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={`absolute inset-0 h-full w-full ${className ?? ""}`} />
  );
}
