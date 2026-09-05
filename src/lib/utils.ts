import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function elapsedSince(isoDate: string, now = Date.now()) {
  const start = new Date(`${isoDate}T00:00:00`).getTime();
  let diff = Math.max(0, now - start);
  const days = Math.floor(diff / 86_400_000);
  diff %= 86_400_000;
  const hours = Math.floor(diff / 3_600_000);
  diff %= 3_600_000;
  const minutes = Math.floor(diff / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

export function passwordsMatch(input: string, expected: string) {
  const fold = (value: string) =>
    value.trim().toLowerCase().replace(/[\s._-]/g, "");
  return fold(input) === fold(expected);
}
