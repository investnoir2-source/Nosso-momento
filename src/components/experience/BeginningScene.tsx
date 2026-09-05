import { useEffect, useRef, useState } from "react";
import { relationshipConfig } from "@/data/relationshipConfig";
import { cn } from "@/lib/utils";
import { useBeats, usePrefersReducedMotion } from "./hooks";
import { BeatLine, ContinueButton, SceneFrame } from "./primitives";

export function BeginningScene({ onNext }: { onNext: () => void }) {
  const { copy, relationshipDateLabel, myName, partnerName } = relationshipConfig;
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState(reduced ? 2 : 0);
  const advanceBeats = useRef<() => void>(() => {});

  useEffect(() => {
    if (reduced) {
      setPhase(2);
      return;
    }
    const move = window.setTimeout(() => setPhase(1), 500);
    const arrive = window.setTimeout(() => setPhase(2), 3400);
    return () => {
      window.clearTimeout(move);
      window.clearTimeout(arrive);
    };
  }, [reduced]);

  return (
    <SceneFrame
      onAdvance={() => {
        if (phase < 2) setPhase(2);
        else advanceBeats.current();
      }}
    >
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-5">
        <BeatLine show variant="date">
          {relationshipDateLabel}
        </BeatLine>
        <BeatLine show variant="whisper">
          {copy.beginningLead}
        </BeatLine>

        <div className="relative my-8 h-28 w-full max-w-sm">
          <span
            className={cn(
              "absolute top-1/2 size-3 rounded-full bg-blood-glow shadow-[0_0_18px_var(--color-blood-glow)]",
              "transition-[left] duration-[2800ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              phase >= 1 ? "left-[calc(50%-6px)]" : "left-[12%]",
            )}
            style={{ transform: "translateY(-50%)" }}
            aria-hidden="true"
          />
          <span
            className={cn(
              "absolute top-1/2 size-3 rounded-full bg-sand shadow-[0_0_18px_var(--color-sand)]",
              "transition-[left] duration-[2800ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              phase >= 1 ? "left-[calc(50%-6px)]" : "left-[calc(88%-12px)]",
            )}
            style={{ transform: "translateY(-50%)" }}
            aria-hidden="true"
          />
          <span className="absolute top-[calc(50%+18px)] left-[10%] font-sans text-[0.65rem] tracking-[0.2em] text-sand-dim uppercase">
            {myName}
          </span>
          <span className="absolute top-[calc(50%+18px)] right-[10%] font-sans text-[0.65rem] tracking-[0.2em] text-sand-dim uppercase">
            {partnerName}
          </span>
        </div>

        {phase >= 2 ? (
          <BeginningLines onNext={onNext} advanceRef={advanceBeats} />
        ) : null}
      </div>
    </SceneFrame>
  );
}

function BeginningLines({
  onNext,
  advanceRef,
}: {
  onNext: () => void;
  advanceRef: { current: () => void };
}) {
  const { copy } = relationshipConfig;
  const reduced = usePrefersReducedMotion();
  const { shown, done, advance } = useBeats(copy.beginning.length, 2300, reduced);
  advanceRef.current = advance;

  return (
    <div className="flex w-full flex-col items-center gap-5">
      {copy.beginning.map((line, index) => (
        <BeatLine
          key={line}
          show={shown > index}
          variant={index === 1 ? "lead" : "body"}
        >
          {line}
        </BeatLine>
      ))}
      {done ? (
        <ContinueButton onClick={onNext}>{copy.continue}</ContinueButton>
      ) : null}
    </div>
  );
}
