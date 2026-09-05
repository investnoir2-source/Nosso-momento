import { relationshipConfig } from "@/data/relationshipConfig";
import { useBeats, usePrefersReducedMotion } from "./hooks";
import { BeatLine, ContinueButton, SceneFrame } from "./primitives";

export function IntroScene({ onNext }: { onNext: () => void }) {
  const { copy } = relationshipConfig;
  const reduced = usePrefersReducedMotion();
  const { shown, done, advance } = useBeats(copy.intro.length, 2500, reduced, 1600);

  return (
    <SceneFrame onAdvance={advance} className="bg-ink">
      <div
        className="glow-orb pointer-events-none absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 sm:size-56"
        aria-hidden="true"
      />
      <div className="relative z-10 flex max-w-lg flex-col items-center gap-6">
        {copy.intro.map((line, index) => (
          <BeatLine
            key={line}
            show={shown > index}
            variant={index === 0 ? "display" : index === copy.intro.length - 1 ? "lead" : "body"}
          >
            {line}
          </BeatLine>
        ))}
        {done ? (
          <ContinueButton onClick={onNext}>{copy.introCta}</ContinueButton>
        ) : null}
      </div>
    </SceneFrame>
  );
}
