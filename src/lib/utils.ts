import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: string): string {
  const major = amount / 100;
  try {
    return new Intl.NumberFormat("ar-PS", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(major);
  } catch {
    return `${major} ${currency}`;
  }
}

export function formatDurationDays(days: number): string {
  if (days % 30 === 0) {
    const months = days / 30;
    if (months === 1) return "شهر واحد";
    if (months === 2) return "شهران";
    if (months >= 3 && months <= 10) return `${months} أشهر`;
    return `${months} شهرًا`;
  }
  if (days === 1) return "يوم واحد";
  if (days === 2) return "يومان";
  if (days >= 3 && days <= 10) return `${days} أيام`;
  return `${days} يومًا`;
}
