import { useEffect, useState } from "react";
import { relationshipConfig } from "@/data/relationshipConfig";
import { cn } from "@/lib/utils";
import { useBeats, usePrefersReducedMotion } from "./hooks";
import { BeatLine, ContinueButton, SceneFrame } from "./primitives";

export function DistanceScene({ onNext }: { onNext: () => void }) {
  const { copy, myName, partnerName, fromCity, fromState, toCity, toState } =
    relationshipConfig;
  const reduced = usePrefersReducedMotion();
  const [heart, setHeart] = useState(reduced);
  const { shown, done, advance } = useBeats(copy.distance.length, 2300, reduced);

  useEffect(() => {
    if (reduced) return;
    if (shown >= 3) setHeart(true);
  }, [shown, reduced]);

  return (
    <SceneFrame onAdvance={advance}>
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-5">
        <PlaceCard name={myName} city={fromCity} state={fromState} />
        <div className="relative flex h-40 w-28 items-center justify-center">
          <svg viewBox="0 0 80 160" className="h-full w-full" aria-hidden="true">
            <path
              d="M40 8 V152"
              fill="none"
              stroke="url(#lineGlow)"
              strokeWidth="1.4"
              strokeDasharray="144"
              strokeDashoffset={heart ? 0 : 144}
              style={{
                transition: "stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
            <path
              d="M40 118 C40 118 16 96 16 76 C16 64 25 56 36 56 C42 56 47 60 40 70 C33 60 38 56 44 56 C55 56 64 64 64 76 C64 96 40 118 40 118 Z"
              fill="none"
              stroke="var(--color-blood-glow)"
              strokeWidth="1.5"
              strokeDasharray="200"
              strokeDashoffset={heart ? 0 : 200}
              className={cn(
                "transition-[stroke-dashoffset,opacity] duration-[1800ms] ease-out",
                heart ? "opacity-100" : "opacity-0",
              )}
            />
            <defs>
              <linearGradient id="lineGlow" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#7a1c28" />
                <stop offset="50%" stopColor="#d9cbb4" />
                <stop offset="100%" stopColor="#7a1c28" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <PlaceCard name={partnerName} city={toCity} state={toState} />

        {copy.distance.map((line, index) => (
          <BeatLine
            key={line}
            show={shown > index}
            variant={index === 3 ? "lead" : "body"}
          >
            {line}
          </BeatLine>
        ))}

        {done ? (
          <ContinueButton onClick={onNext}>{copy.continue}</ContinueButton>
        ) : null}
      </div>
    </SceneFrame>
  );
}

function PlaceCard({
  name,
  city,
  state,
}: {
  name: string;
  city: string;
  state: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="font-display text-2xl text-ivory">{name}</p>
      <p className="mt-1 font-sans text-xs tracking-[0.2em] text-sand-dim uppercase">
        {city} — {state}
      </p>
    </div>
  );
}
