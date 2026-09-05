import { useCallback, useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function useBeats(
  count: number,
  delayMs: number,
  reduced: boolean,
  startDelay = 700,
) {
  const [shown, setShown] = useState(reduced ? count : 0);
  const [done, setDone] = useState(reduced && count > 0);

  const advance = useCallback(() => {
    setShown((current) => Math.min(count, current + 1));
  }, [count]);

  useEffect(() => {
    if (reduced) {
      setShown(count);
      setDone(true);
    }
  }, [count, reduced]);

  useEffect(() => {
    if (reduced) return;
    if (shown >= count) {
      const finish = window.setTimeout(() => setDone(true), 640);
      return () => window.clearTimeout(finish);
    }
    const wait = shown === 0 ? startDelay : delayMs;
    const id = window.setTimeout(() => {
      setShown((current) => Math.min(count, current + 1));
    }, wait);
    return () => window.clearTimeout(id);
  }, [shown, count, delayMs, reduced, startDelay]);

  return { shown, done, advance };
}

export function useSceneFade(duration = 700) {
  const [opaque, setOpaque] = useState(true);
  const timer = useRef<number | null>(null);

  const fadeTo = useCallback(
    (next: () => void) => {
      setOpaque(false);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        next();
        requestAnimationFrame(() => setOpaque(true));
      }, duration);
    },
    [duration],
  );

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  return { opaque, fadeTo };
}
