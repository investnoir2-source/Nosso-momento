import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function HiddenStar({
  onOpen,
  className,
}: {
  onOpen: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onOpen();
      }}
      className={cn(
        "star-secret fixed z-40 flex size-11 items-center justify-center text-sand",
        "left-2 bottom-[max(0.4rem,env(safe-area-inset-bottom))]",
        "opacity-35 hover:opacity-90 focus-visible:opacity-100",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand/40",
        className,
      )}
      aria-label="estrela"
    >
      <Star className="size-3.5 fill-sand/80" strokeWidth={1} />
    </button>
  );
}
