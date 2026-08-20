const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export type PublicPlan = {
  id?: string;
  name: string;
  description: string | null;
  priceAmount: number;
  currency: string;
  durationDays: number;
  sortOrder: number;
};

export type PublicPreviewLesson = {
  id: string;
  title: string;
  unitTitle: string;
  chapterTitle: string;
  category: "foundation" | "curriculum" | "other";
  videoCount: number;
  totalDurationSeconds: number | null;
  primaryVideoId: string | null;
  coverUrl?: string | null;
};

export type PublicPreviewLessonDetail = PublicPreviewLesson & {
  videos: Array<{
    id: string;
    title: string | null;
    durationSeconds: number | null;
    sortOrder: number;
  }>;
  playbackUrl: string | null;
  playbackExpiresInSeconds: number | null;
};

export type PublicCatalogLesson = {
  id: string;
  title: string;
  sortOrder: number;
  accessLevel: "preview" | "subscriber_only";
  isLocked: boolean;
  videoCount: number;
  pdfCount: number;
  coverUrl?: string | null;
};

export type PublicCatalogChapter = {
  id: string;
  title: string;
  sortOrder: number;
  lessons: PublicCatalogLesson[];
};

export type PublicCatalogUnit = {
  id: string;
  title: string;
  description: string | null;
  sortOrder: number;
  coverUrl?: string | null;
  chapters: PublicCatalogChapter[];
};

export type PublicHomeVideo = {
  id: string;
  title: string;
  sortOrder: number;
  playbackUrl: string;
  playbackExpiresInSeconds: number;
};

export type FetchResult<T> = {
  data: T;
  error: boolean;
};

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    next: init?.method && init.method !== "GET" ? undefined : { revalidate: 60 },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `API ${path} failed (${response.status})${body ? `: ${body}` : ""}`,
    );
  }

  return (await response.json()) as T;
}

export async function fetchPublicPlans(): Promise<FetchResult<PublicPlan[]>> {
  try {
    const data = await apiFetch<{ plans: PublicPlan[] }>("/plans/public");
    return { data: data.plans, error: false };
  } catch {
    return { data: [], error: true };
  }
}

export async function fetchPreviewLessons(): Promise<
  FetchResult<PublicPreviewLesson[]>
> {
  try {
    const data = await apiFetch<{ lessons: PublicPreviewLesson[] }>(
      "/content/public/preview",
    );
    return { data: data.lessons, error: false };
  } catch {
    return { data: [], error: true };
  }
}

export async function fetchPublicCatalog(): Promise<
  FetchResult<PublicCatalogUnit[]>
> {
  try {
    const data = await apiFetch<{ units: PublicCatalogUnit[] }>(
      "/content/public/catalog",
    );
    return { data: data.units, error: false };
  } catch {
    return { data: [], error: true };
  }
}

export async function fetchHomeVideos(): Promise<
  FetchResult<PublicHomeVideo[]>
> {
  try {
    const data = await apiFetch<{ homeVideos: PublicHomeVideo[] }>(
      "/home-videos/public",
    );
    return { data: data.homeVideos, error: false };
  } catch {
    return { data: [], error: true };
  }
}

export async function fetchPreviewLessonDetail(
  lessonId: string,
): Promise<PublicPreviewLessonDetail | null> {
  try {
    return await apiFetch<PublicPreviewLessonDetail>(
      `/content/public/preview/${lessonId}`,
    );
  } catch {
    return null;
  }
}

export async function submitContact(input: {
  name: string;
  email: string;
  message: string;
  phone?: string;
}): Promise<{ ok: true }> {
  return apiFetch<{ ok: true }>("/contact", {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
  });
}
