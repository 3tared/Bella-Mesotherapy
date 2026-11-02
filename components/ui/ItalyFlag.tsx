import { cn } from "@/lib/utils"

type ItalyFlagProps = {
  /** Height in px. Width is size * 1.5 (3:2 ratio). */
  size?: number
  /** Background the flag sits on. Controls the hairline outline so the white stripe never disappears. */
  tone?: "light" | "dark"
  className?: string
}

export function ItalyFlag({ size = 16, tone = "light", className }: ItalyFlagProps) {
  return (
    <svg
      width={Math.round(size * 1.5)}
      height={size}
      viewBox="0 0 3 2"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      style={{ direction: "ltr" }}
      className={cn(
        "inline-block shrink-0 align-middle rounded-[2px]",
        tone === "dark"
          ? "shadow-[0_0_0_0.5px_rgba(255,255,255,0.28)]"
          : "shadow-[0_0_0_0.5px_rgba(26,26,26,0.20)]",
        className
      )}
    >
      {/* Physical coordinates on purpose: RTL can never reorder these. */}
      <rect x="0" y="0" width="1" height="2" fill="#009246" />
      <rect x="1" y="0" width="1" height="2" fill="#F1F2F1" />
      <rect x="2" y="0" width="1" height="2" fill="#CE2B37" />
    </svg>
  )
}

