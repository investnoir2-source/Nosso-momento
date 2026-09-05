import { relationshipConfig } from "@/data/relationshipConfig";
import { useBeats, usePrefersReducedMotion } from "./hooks";
import { BeatLine, ContinueButton, SceneFrame } from "./primitives";

export function TwoMonthsScene({ onNext }: { onNext: () => void }) {
  const { copy, anniversary, memoryStill } = relationshipConfig;
  const reduced = usePrefersReducedMotion();
  const { shown, done, advance } = useBeats(copy.months.length + 1, 2200, reduced);

  const fragments = [
    { word: copy.monthFragments[0], className: "left-0 top-2" },
    { word: copy.monthFragments[1], className: "right-0 top-6" },
    { word: copy.monthFragments[2], className: "left-1 bottom-3" },
    { word: copy.monthFragments[3], className: "right-2 bottom-8" },
    { word: copy.monthFragments[4], className: "left-1/2 top-0 -translate-x-1/2" },
  ];

  return (
    <SceneFrame onAdvance={advance}>
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-5">
        <BeatLine show={shown > 0} variant="title">
          {anniversary}.
        </BeatLine>
        {copy.months.map((line, index) => (
          <BeatLine
            key={line}
            show={shown > index + 1}
            variant={index === 0 ? "lead" : "body"}
          >
            {line}
          </BeatLine>
        ))}

        {shown > 2 ? (
          <div className="relative mt-6 h-52 w-full max-w-xs">
            <img
              src={memoryStill}
              alt=""
              className="film-still pointer-events-none absolute top-1/2 left-1/2 h-36 w-24 -translate-x-1/2 -translate-y-1/2 rotate-[-7deg] object-cover opacity-85 shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
            />
            {fragments.map((item, index) => (
              <span
                key={item.word}
                className={`film-still absolute font-display text-sm italic text-sand ${item.className}`}
                style={{ animationDelay: `${index * 180}ms` }}
              >
                {item.word}
              </span>
            ))}
          </div>
        ) : null}

        {done ? (
          <ContinueButton onClick={onNext}>{copy.continue}</ContinueButton>
        ) : null}
      </div>
    </SceneFrame>
  );
}
