import { relationshipConfig } from "@/data/relationshipConfig";
import { useBeats, usePrefersReducedMotion } from "./hooks";
import { BeatLine, ContinueButton, SceneFrame } from "./primitives";

export function SecretScene({ onClose }: { onClose: () => void }) {
  const { copy } = relationshipConfig;
  const reduced = usePrefersReducedMotion();
  const { shown, done, advance } = useBeats(copy.secret.length, 2000, reduced);

  return (
    <div className="fixed inset-0 z-50 bg-ink">
      <SceneFrame onAdvance={advance}>
        <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-6">
          {copy.secret.map((line, index) => (
            <BeatLine
              key={line}
              show={shown > index}
              variant={index === 0 ? "display" : index === 4 ? "lead" : "body"}
            >
              {line}
            </BeatLine>
          ))}
          {done ? (
            <ContinueButton onClick={onClose}>{copy.closeSecret}</ContinueButton>
          ) : null}
        </div>
      </SceneFrame>
    </div>
  );
}
