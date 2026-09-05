import { useCallback, useState } from "react";
import { BeginningScene } from "./BeginningScene";
import { ConversationsScene } from "./ConversationsScene";
import { DistanceScene } from "./DistanceScene";
import { FinalScene } from "./FinalScene";
import { HiddenStar } from "./HiddenStar";
import { IntroScene } from "./IntroScene";
import { LoveLetter } from "./LoveLetter";
import { LoveScene } from "./LoveScene";
import { MusicPlayer } from "./MusicPlayer";
import { ParticleField } from "./ParticleField";
import { PasswordScreen } from "./PasswordScreen";
import { PhotoGallery } from "./PhotoGallery";
import { PromiseScene } from "./PromiseScene";
import { RelationshipCounter } from "./RelationshipCounter";
import { SecretScene } from "./SecretScene";
import { TwoMonthsScene } from "./TwoMonthsScene";
import { Grain, Vignette } from "./primitives";
import { useSceneFade } from "./hooks";
import { cn } from "@/lib/utils";

const scenes = [
  "password",
  "intro",
  "beginning",
  "counter",
  "months",
  "talks",
  "photos",
  "love",
  "distance",
  "letter",
  "promise",
  "finale",
] as const;

type SceneId = (typeof scenes)[number];

export function Experience() {
  const [scene, setScene] = useState<SceneId>("password");
  const [secret, setSecret] = useState(false);
  const [musicUnlocked, setMusicUnlocked] = useState(false);
  const { opaque, fadeTo } = useSceneFade(720);

  const go = useCallback(
    (next: SceneId) => {
      fadeTo(() => setScene(next));
    },
    [fadeTo],
  );

  const next = useCallback(() => {
    const index = scenes.indexOf(scene);
    const following = scenes[index + 1];
    if (following) go(following);
  }, [go, scene]);

  const handleUnlock = () => go("intro");
  const enterPlace = () => {
    setMusicUnlocked(true);
    go("beginning");
  };

  const showStar = scene !== "password" && scene !== "intro" && !secret;

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-ink text-ivory">
      <ParticleField mode={scene === "finale" ? "heart" : "float"} />
      <Vignette />
      <Grain />

      <div
        className={cn(
          "relative z-10 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          opaque ? "opacity-100" : "opacity-0",
        )}
      >
        {scene === "password" ? <PasswordScreen onUnlock={handleUnlock} /> : null}
        {scene === "intro" ? <IntroScene onNext={enterPlace} /> : null}
        {scene === "beginning" ? <BeginningScene onNext={next} /> : null}
        {scene === "counter" ? <RelationshipCounter onNext={next} /> : null}
        {scene === "months" ? <TwoMonthsScene onNext={next} /> : null}
        {scene === "talks" ? <ConversationsScene onNext={next} /> : null}
        {scene === "photos" ? <PhotoGallery onNext={next} /> : null}
        {scene === "love" ? <LoveScene onNext={next} /> : null}
        {scene === "distance" ? <DistanceScene onNext={next} /> : null}
        {scene === "letter" ? <LoveLetter onNext={next} /> : null}
        {scene === "promise" ? <PromiseScene onNext={next} /> : null}
        {scene === "finale" ? <FinalScene /> : null}
      </div>

      {showStar ? <HiddenStar onOpen={() => setSecret(true)} /> : null}
      {secret ? <SecretScene onClose={() => setSecret(false)} /> : null}
      <MusicPlayer unlocked={musicUnlocked} />
    </main>
  );
}
