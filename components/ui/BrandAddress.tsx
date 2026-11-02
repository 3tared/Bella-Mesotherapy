import { brand } from "@/data/brand";
import { cn } from "@/lib/utils";

type BrandAddressProps = {
  /** lines = two stacked lines. inline = one line. short = "Roma, Italy" for tight spaces. */
  variant?: "lines" | "inline" | "short";
  /** Wrap in a Google Maps link. */
  asLink?: boolean;
  className?: string;
};

export function BrandAddress({
  variant = "lines",
  asLink = true,
  className,
}: BrandAddressProps) {
  const a = brand.address;

  const content =
    variant === "lines" ? (
      <>
        <span className="block">{a.street}</span>
        <span className="block">
          {a.postalCode} {a.city} {a.region}, {a.country}
        </span>
      </>
    ) : variant === "short" ? (
      <span>{a.short}</span>
    ) : (
      <span>{a.full}</span>
    );

  return (
    <address
      // Latin address inside an RTL page: keep it LTR and isolated so commas/numbers never reorder,
      // but right-align the text block in RTL so it still hugs the reading-start side.
      dir="ltr"
      style={{ unicodeBidi: "isolate" }}
      className={cn("inline-block not-italic rtl:text-right", className)}
    >
      {asLink ? (
        <a
          href={a.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-300 hover:text-bella-gold"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </address>
  );
}

