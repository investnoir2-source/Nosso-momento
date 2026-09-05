import { relationshipConfig } from "@/data/relationshipConfig";
import { useBeats, usePrefersReducedMotion } from "./hooks";
import { BeatLine, HeartMark, SceneFrame } from "./primitives";

export function FinalScene() {
  const { copy, myName, phrase } = relationshipConfig;
  const reduced = usePrefersReducedMotion();
  const { shown, done, advance } = useBeats(copy.finale.length, 2300, reduced);

  return (
    <SceneFrame onAdvance={advance} className="py-20">
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-5">
        {copy.finale.map((line, index) => (
          <BeatLine
            key={line}
            show={shown > index}
            variant={
              index === 0
                ? "display"
                : index === 4 || index === copy.finale.length - 1
                  ? "lead"
                  : "body"
            }
          >
            {line}
          </BeatLine>
        ))}
        {done ? (
          <p className="beat mt-4 font-display text-xl italic text-sand">
            {myName} <HeartMark />
          </p>
        ) : null}
        {done ? (
          <p className="mt-6 max-w-sm text-center font-display text-base italic leading-relaxed text-sand-dim">
            {phrase}
          </p>
        ) : null}
      </div>
    </SceneFrame>
  );
}
