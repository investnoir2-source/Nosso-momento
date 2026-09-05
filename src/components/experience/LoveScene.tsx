import { relationshipConfig } from "@/data/relationshipConfig";
import { useBeats, usePrefersReducedMotion } from "./hooks";
import { BeatLine, ContinueButton, SceneFrame } from "./primitives";

export function LoveScene({ onNext }: { onNext: () => void }) {
  const { copy } = relationshipConfig;
  const reduced = usePrefersReducedMotion();
  const { shown, done, advance } = useBeats(copy.love.length, 2400, reduced);

  return (
    <SceneFrame onAdvance={advance}>
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-5">
        {copy.love.map((line, index) => (
          <BeatLine
            key={line}
            show={shown > index}
            variant={
              index === 0
                ? "display"
                : index === copy.love.length - 1
                  ? "lead"
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
