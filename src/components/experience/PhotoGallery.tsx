import { X } from "lucide-react";
import { useState } from "react";
import { relationshipConfig } from "@/data/relationshipConfig";
import { BeatLine, ContinueButton, SceneFrame } from "./primitives";

export function PhotoGallery({ onNext }: { onNext: () => void }) {
  const { photos, copy } = relationshipConfig;
  const [open, setOpen] = useState<number | null>(null);
  const current = open === null ? null : photos[open];

  return (
    <SceneFrame className="justify-start pt-14 pb-24">
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-6">
        <BeatLine show variant="whisper">
          {copy.photosTitle}
        </BeatLine>

        <ul className="flex w-full flex-col gap-6">
          {photos.map((photo, index) => (
            <li key={photo.src} className="film-still" style={{ animationDelay: `${index * 120}ms` }}>
              <button
                type="button"
                aria-label={photo.caption}
                onClick={(event) => {
                  event.stopPropagation();
                  setOpen(index);
                }}
                className="group block w-full text-left"
              >
                <figure className="overflow-hidden rounded-md border border-ivory/10 bg-ink-lift">
                  <div className="aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="kenburns h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="px-4 py-3 font-display text-lg italic text-sand">
                    {photo.caption}
                  </figcaption>
                </figure>
              </button>
            </li>
          ))}
        </ul>

        <ContinueButton onClick={onNext}>{copy.continue}</ContinueButton>
      </div>

      {current ? (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/80 px-4 py-10 backdrop-blur-md"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
        >
          <button
            type="button"
            className="absolute top-4 right-4 flex size-11 items-center justify-center text-sand"
            onClick={(event) => {
              event.stopPropagation();
              setOpen(null);
            }}
            aria-label={copy.closePhoto}
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
          <img
            src={current.src}
            alt={current.caption}
            className="max-h-[72dvh] w-auto max-w-full object-contain shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
          />
          <p className="mt-5 font-display text-2xl italic text-ivory">
            {current.caption}
          </p>
        </div>
      ) : null}
    </SceneFrame>
  );
}
