import { useMemo } from "react";
import { cn } from "@/lib/utils";

type Mode = "float" | "heart";

function heartPoint(t: number) {
  const x = 16 * Math.sin(t) ** 3;
  const y = -(
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t)
  );
  return {
    left: 50 + x * 1.15,
    top: 48 + y * 1.15,
  };
}

export function ParticleField({
  mode = "float",
  density = 32,
}: {
  mode?: Mode;
  density?: number;
}) {
  const particles = useMemo(() => {
    return Array.from({ length: density }, (_, index) => {
      const heart = heartPoint((index / density) * Math.PI * 2);
      return {
        id: index,
        left: 6 + ((index * 37) % 88),
        top: 8 + ((index * 53) % 84),
        size: 1.5 + (index % 3) * 0.7,
        sand: index % 2 === 0,
        duration: 8 + (index % 7),
        delay: (index % 5) * 0.6,
        hx: heart.left,
        hy: heart.top,
      };
    });
  }, [density]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className={cn(
            "absolute rounded-full",
            p.sand ? "bg-sand/55" : "bg-blood-glow/55",
            mode === "float" ? "particle-drift" : "",
          )}
          style={{
            width: p.size,
            height: p.size,
            left: `${mode === "heart" ? p.hx : p.left}%`,
            top: `${mode === "heart" ? p.hy : p.top}%`,
            boxShadow: p.sand
              ? "0 0 8px color-mix(in oklab, var(--color-sand) 70%, transparent)"
              : "0 0 8px color-mix(in oklab, var(--color-blood-glow) 70%, transparent)",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transitionProperty: "left, top, opacity",
            transitionDuration: "2.8s",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      ))}
    </div>
  );
}
