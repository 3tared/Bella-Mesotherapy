import { cn } from "@/lib/utils";

export function TextHoverEffect({
  text,
  duration = 0.4,
  className,
}: {
  text: string;
  duration?: number;
  className?: string;
}) {
  const wordmarkStyle = {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "clamp(6rem, 15vw, 11.25rem)",
    letterSpacing: "0.15em",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "group relative flex h-full w-full select-none items-center justify-center overflow-hidden",
        className
      )}
    >
      <span
        className="whitespace-nowrap font-bold leading-none text-white/[0.04] [-webkit-text-stroke:0.5px_rgba(255,255,255,0.08)]"
        style={wordmarkStyle}
      >
        {text}
      </span>
      <span
        className="pointer-events-none absolute whitespace-nowrap bg-[linear-gradient(90deg,#A07840_0%,#C9A96E_25%,#E8D5A3_50%,#C9A96E_75%,#A07840_100%)] bg-clip-text font-bold leading-none text-transparent opacity-0 transition-opacity group-hover:opacity-100"
        style={{ ...wordmarkStyle, transitionDuration: `${duration}s` }}
      >
        {text}
      </span>
    </div>
  );
}
