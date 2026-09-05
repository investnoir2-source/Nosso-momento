import { relationshipConfig } from "@/data/relationshipConfig";
import { useBeats, usePrefersReducedMotion } from "./hooks";
import { BeatLine, ContinueButton, SceneFrame } from "./primitives";

export function PromiseScene({ onNext }: { onNext: () => void }) {
  const { copy } = relationshipConfig;
  const reduced = usePrefersReducedMotion();
  const { shown, done, advance } = useBeats(copy.promise.length, 2500, reduced);

  return (
    <SceneFrame onAdvance={advance}>
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-5">
        {copy.promise.map((line, index) => (
          <BeatLine
            key={line}
            show={shown > index}
            variant={
              index === copy.promise.length - 1
                ? "lead"
                : index === 1
                  ? "display"
                  : "body"
            }
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
