import { relationshipConfig } from "@/data/relationshipConfig";
import { useBeats, usePrefersReducedMotion } from "./hooks";
import { BeatLine, ContinueButton, HeartMark, SceneFrame } from "./primitives";

export function LoveLetter({ onNext }: { onNext: () => void }) {
  const { copy, partnerName, myName } = relationshipConfig;
  const reduced = usePrefersReducedMotion();
  const { shown, done, advance } = useBeats(copy.letter.length + 1, 2600, reduced);

  return (
    <SceneFrame className="justify-start pt-14 pb-24" onAdvance={advance}>
      <article className="relative z-10 w-full max-w-lg">
        <BeatLine show variant="whisper">
          {copy.letterTitle}
        </BeatLine>
        <p className="mt-6 font-display text-3xl italic text-ivory">
          {partnerName},
        </p>
        <div className="mt-8 flex flex-col gap-6">
          {copy.letter.map((paragraph, index) =>
            shown > index + 1 ? (
              <p
                key={paragraph}
                className="beat font-sans text-[1.02rem] font-light leading-[1.7] text-ivory-dim"
              >
                {paragraph}
              </p>
            ) : null,
          )}
        </div>
        {done ? (
          <p className="mt-10 font-display text-xl italic text-sand">
            Com você,
            <br />
            {myName} <HeartMark />
          </p>
        ) : null}
        {done ? (
          <ContinueButton onClick={onNext}>{copy.continue}</ContinueButton>
        ) : null}
      </article>
    </SceneFrame>
  );
}
