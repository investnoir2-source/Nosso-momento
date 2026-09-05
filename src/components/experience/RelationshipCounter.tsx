import { useEffect, useState } from "react";
import { relationshipConfig } from "@/data/relationshipConfig";
import { elapsedSince } from "@/lib/utils";
import { useBeats, usePrefersReducedMotion } from "./hooks";
import { BeatLine, ContinueButton, SceneFrame } from "./primitives";

function Pad({ value }: { value: number }) {
  return (
    <span className="tabular-nums">
      {String(value).padStart(2, "0")}
    </span>
  );
}

export function RelationshipCounter({ onNext }: { onNext: () => void }) {
  const { copy, relationshipDate } = relationshipConfig;
  const reduced = usePrefersReducedMotion();
  const { shown, done, advance } = useBeats(2, 1800, reduced);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const time = elapsedSince(relationshipDate, now);
  const units = [
    { label: "dias", value: time.days },
    { label: "horas", value: time.hours },
    { label: "minutos", value: time.minutes },
    { label: "segundos", value: time.seconds },
  ];

  return (
    <SceneFrame onAdvance={advance}>
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-8">
        <BeatLine show={shown > 0} variant="lead">
          {copy.counterTitle}
        </BeatLine>

        <div
          className="grid w-full max-w-md grid-cols-4 gap-2 sm:gap-3"
          aria-live="polite"
        >
          {units.map((unit) => (
            <div
              key={unit.label}
              className="flex flex-col items-center rounded-lg border border-ivory/8 bg-ink-lift/60 px-1 py-4"
            >
              <span className="font-display text-[clamp(1.5rem,6vw,2.2rem)] leading-none text-ivory">
                <Pad value={unit.value} />
              </span>
              <span className="mt-2 font-sans text-[0.62rem] tracking-[0.18em] text-sand-dim uppercase">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <BeatLine show={shown > 1} variant="body">
          {copy.counterAfter}
        </BeatLine>

        {done ? (
          <ContinueButton onClick={onNext}>{copy.continue}</ContinueButton>
        ) : null}
      </div>
    </SceneFrame>
  );
}
