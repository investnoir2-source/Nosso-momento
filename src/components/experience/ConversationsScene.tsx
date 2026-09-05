import { relationshipConfig } from "@/data/relationshipConfig";
import { useBeats, usePrefersReducedMotion } from "./hooks";
import { BeatLine, ContinueButton, SceneFrame } from "./primitives";

export function ConversationsScene({ onNext }: { onNext: () => void }) {
  const { copy } = relationshipConfig;
  const reduced = usePrefersReducedMotion();
  const { shown, done, advance } = useBeats(copy.talks.length + 1, 2000, reduced);

  return (
    <SceneFrame onAdvance={advance}>
      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-6">
        <BeatLine show={shown > 0} variant="whisper">
          {copy.talksLead}
        </BeatLine>
        <div className="flex w-full flex-col gap-4">
          {copy.talks.map((line, index) => {
            const mine = index % 2 === 1;
            return shown > index + 1 ? (
              <p
                key={line}
                className={`msg-bubble max-w-[85%] rounded-lg border px-4 py-3 font-sans text-sm font-light leading-relaxed ${
                  mine
                    ? "self-end rounded-br-sm border-blood/40 bg-blood-deep/50 text-ivory"
                    : "self-start rounded-bl-sm border-sand/20 bg-ink-lift text-sand"
                }`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {line}
              </p>
            ) : null;
          })}
        </div>
        {done ? (
          <ContinueButton onClick={onNext}>{copy.continue}</ContinueButton>
        ) : null}
      </div>
    </SceneFrame>
  );
}
