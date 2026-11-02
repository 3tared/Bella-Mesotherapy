import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { ItalyFlag } from "@/components/ui/ItalyFlag"

type ItalyBadgeProps = {
  /** inline = flag + text. pill = bordered gold pill. chip = small frosted chip for image corners. */
  variant?: "inline" | "pill" | "chip"
  tone?: "light" | "dark"
  className?: string
}

export function ItalyBadge({ variant = "inline", tone = "light", className }: ItalyBadgeProps) {
  const t = useTranslations("origin")
  const chip = variant === "chip"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap font-medium uppercase",
        // Letter-spacing breaks Arabic letter joining -> disable it (and uppercase) in RTL.
        "tracking-[0.18em] rtl:tracking-normal rtl:normal-case",
        variant === "inline" && "text-[11px]",
        variant === "pill" &&
          "rounded-full border border-bella-gold/30 bg-bella-gold/5 px-3.5 py-1.5 text-[10px]",
        chip &&
          "rounded-full bg-bella-ivory/90 px-2 py-1 text-[9px] text-bella-charcoal/80 shadow-sm backdrop-blur-sm sm:px-2.5",
        !chip && (tone === "dark" ? "text-bella-ivory/80" : "text-bella-charcoal/70"),
        className
      )}
    >
      <ItalyFlag size={chip ? 12 : 14} tone={chip ? "light" : tone} />
      {/* On chips, mobile shows the flag only; the text stays available to screen readers. */}
      <span className={chip ? "sr-only sm:not-sr-only" : undefined}>{t("italianFormula")}</span>
    </span>
  )
}

