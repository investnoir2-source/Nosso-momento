import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Grain() {
  return <div className="grain" aria-hidden="true" />;
}

export function Vignette() {
  return <div className="vignette" aria-hidden="true" />;
}

export function SceneFrame({
  children,
  className,
  onAdvance,
}: {
  children: ReactNode;
  className?: string;
  onAdvance?: () => void;
}) {
  return (
    <section
      className={cn(
        "relative z-10 flex min-h-dvh w-full flex-col items-center justify-center overflow-x-hidden overflow-y-auto px-5 py-14 sm:px-8",
        className,
      )}
      onClick={onAdvance}
    >
      {children}
    </section>
  );
}

export function ContinueButton({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={cn(
        "mt-8 min-h-11 px-6 py-2.5 font-sans text-sm font-medium tracking-[0.18em] text-sand uppercase",
        "rounded-md border border-sand/25 bg-transparent",
        "transition-[color,border-color,background-color,transform,opacity] duration-200 ease-out",
        "hover:border-sand/55 hover:text-ivory",
        "active:scale-[0.96]",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function BeatLine({
  show,
  children,
  variant = "body",
}: {
  show: boolean;
  children: ReactNode;
  variant?: "display" | "lead" | "body" | "whisper" | "date" | "title";
}) {
  if (!show) return null;

  const variants = {
    display:
      "font-display text-[clamp(1.85rem,7vw,3.2rem)] font-medium italic leading-tight tracking-[-0.03em] text-ivory",
    title:
      "font-display text-[clamp(2.2rem,9vw,4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ivory",
    date: "font-display text-[clamp(1.9rem,8vw,3.6rem)] font-medium tracking-[0.18em] text-ivory",
    lead: "font-display text-[clamp(1.3rem,4.4vw,1.85rem)] font-medium italic leading-snug text-ivory",
    body: "max-w-xl font-sans text-[clamp(0.98rem,3.4vw,1.12rem)] font-light leading-relaxed text-ivory-dim",
    whisper:
      "max-w-lg font-sans text-[0.95rem] font-light leading-relaxed tracking-wide text-sand-dim",
  } as const;

  return <p className={cn("beat text-center", variants[variant])}>{children}</p>;
}

export function HeartMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("inline-block size-4 align-[-2px] text-blood-glow", className)}
      fill="currentColor"
    >
      <path d="M12.1 20.3s-7.2-4.4-9.2-8.6C1.4 8.7 3 5.4 6.2 5.1c1.8-.2 3.4.7 4.3 2.1.9-1.4 2.5-2.3 4.3-2.1 3.2.3 4.8 3.6 3.3 6.6-2 4.2-9 8.6-9 8.6z" />
    </svg>
  );
}
