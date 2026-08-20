/** Curated Unsplash imagery for the landing page (royalty-free). */

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const media = {
  /** Full-bleed hero — night sky / cosmic learning atmosphere */
  hero: unsplash("photo-1419242902214-272b3f66ee7a", 2400),
  /** Features editorial — focused study */
  features: unsplash("photo-1434030216411-0b793f4b4173", 1400),
  /** About section — classroom / learning context */
  about: unsplash("photo-1427504494785-3a9ca7044f45", 1400),
  /** Lesson cover pool — science, books, blackboard, lab */
  covers: [
    unsplash("photo-1509228468518-180dd4864904", 800),
    unsplash("photo-1635070041078-e363dbe005cb", 800),
    unsplash("photo-1524995997946-a1c2e315a42f", 800),
    unsplash("photo-1503676260728-1c00da094a0b", 800),
    unsplash("photo-1567427017947-545c5f8d16ad", 800),
    unsplash("photo-1580582932707-520aed937b7b", 800),
    unsplash("photo-1516321318423-f06f85e504b3", 800),
    unsplash("photo-1497633762265-9d179a990aa6", 800),
  ],
} as const;

/** Stable cover pick from a string id (lesson / unit). */
export function pickCover(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return media.covers[hash % media.covers.length]!;
}
