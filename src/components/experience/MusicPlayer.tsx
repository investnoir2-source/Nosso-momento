import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { relationshipConfig } from "@/data/relationshipConfig";
import { cn } from "@/lib/utils";

export function MusicPlayer({ unlocked }: { unlocked: boolean }) {
  const { song } = relationshipConfig;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!song.src) return;
    const audio = new Audio(song.src);
    audio.loop = true;
    audio.volume = 0.42;
    audio.preload = "auto";
    audioRef.current = audio;

    const onTime = () => {
      if (!audio.duration) return;
      setProgress(audio.currentTime / audio.duration);
    };
    const onReady = () => setReady(true);
    const onError = () => setFailed(true);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("canplay", onReady);
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("canplay", onReady);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, [song.src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !unlocked || !song.src || failed) return;
    const play = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    };
    void play();
  }, [unlocked, song.src, failed]);

  if (!song.src || failed) return null;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio?.duration) return;
    audio.currentTime = value * audio.duration;
    setProgress(value);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <div
      className={cn(
        "fixed right-4 top-[max(0.75rem,env(safe-area-inset-top))] z-40",
        "flex items-center gap-2 rounded-lg border border-ivory/10",
        "bg-ink/70 px-3 py-2 backdrop-blur-md",
        "max-w-[min(18rem,calc(100vw-2rem))]",
      )}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => void toggle()}
        className="flex size-10 items-center justify-center rounded-md text-sand transition-[color,transform] duration-150 ease-out hover:text-ivory active:scale-[0.96]"
        aria-label={playing ? "Pausar" : "Tocar"}
      >
        {playing ? (
          <Pause className="size-4" strokeWidth={1.6} />
        ) : (
          <Play className="size-4" strokeWidth={1.6} />
        )}
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate font-sans text-[0.68rem] tracking-wide text-sand">
          {song.title}
        </p>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={progress}
          disabled={!ready}
          onChange={(event) => seek(Number(event.target.value))}
          className="mt-1 h-1 w-full cursor-pointer appearance-none rounded-full bg-ivory/15 accent-sand"
          aria-label="Progresso da música"
        />
      </div>
      <button
        type="button"
        onClick={toggleMute}
        className="flex size-10 items-center justify-center rounded-md text-sand-dim transition-[color,transform] duration-150 ease-out hover:text-sand active:scale-[0.96]"
        aria-label={muted ? "Ativar som" : "Silenciar"}
      >
        {muted ? (
          <VolumeX className="size-4" strokeWidth={1.6} />
        ) : (
          <Volume2 className="size-4" strokeWidth={1.6} />
        )}
      </button>
    </div>
  );
}
