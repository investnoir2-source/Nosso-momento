import { useState } from "react";
import { relationshipConfig } from "@/data/relationshipConfig";
import { cn, passwordsMatch } from "@/lib/utils";
import { BeatLine, ContinueButton, SceneFrame } from "./primitives";

export function PasswordScreen({ onUnlock }: { onUnlock: () => void }) {
  const { copy, password } = relationshipConfig;
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = () => {
    if (success) return;
    if (passwordsMatch(value, password)) {
      setError(false);
      setSuccess(true);
      window.setTimeout(onUnlock, 1400);
      return;
    }
    setError(true);
  };

  return (
    <SceneFrame className="bg-ink">
      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <BeatLine show variant="lead">
          {copy.lockKicker}
        </BeatLine>
        <div className="mt-6">
          <BeatLine show variant="whisper">
            {copy.lockAsk}
          </BeatLine>
        </div>

        <form
          className="mt-12 flex w-full max-w-xs flex-col items-center"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
          autoComplete="off"
        >
          <label htmlFor="gate" className="sr-only">
            Palavra de entrada
          </label>
          <input
            id="gate"
            name="gate"
            type="text"
            inputMode="text"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              if (error) setError(false);
            }}
            className={cn(
              "h-12 w-full border-0 border-b bg-transparent text-center font-display text-xl tracking-[0.28em] text-ivory",
              "placeholder:text-sand-dim/40",
              "focus-visible:outline-none",
              error ? "border-blood-glow" : "border-sand/35 focus:border-sand",
            )}
          />
          <ContinueButton onClick={submit} className="mt-8 w-full">
            {copy.lockEnter}
          </ContinueButton>
        </form>

        <p
          className={cn(
            "mt-6 min-h-6 font-sans text-sm font-light tracking-wide transition-opacity duration-300",
            success ? "text-sand" : "text-blood-glow",
            error || success ? "opacity-100" : "opacity-0",
          )}
          role="status"
        >
          {success ? copy.lockSuccess : error ? copy.lockError : ""}
        </p>
      </div>
    </SceneFrame>
  );
}
