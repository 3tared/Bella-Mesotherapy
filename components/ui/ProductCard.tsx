"use client";

import { motion }    from "framer-motion";
import { cn }        from "@/lib/utils";
import { cardReveal }   from "@/lib/animations";
import { Link }      from "@/i18n/navigation";

/** Flat (already localized) product shape for rendering */
interface FlatProduct {
  id:          string;
  name:        string;
  subtitle:    string;
  description: string;
  keyBenefits: string[];
  volume:      string;
  category:    string;
  color: {
    primary:   string;
    secondary: string;
    text:      string;
  };
  accentColor?: string;
}

interface ProductCardProps {
  product:    FlatProduct;
  index?:     number;
  className?: string;
  onClick?:   (product: FlatProduct) => void;
}

export function ProductCard({ product, index = 0, className, onClick }: ProductCardProps) {
  return (
    <motion.article
      variants={cardReveal}
      custom={index}
      whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }}
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-bella-gold/20 bg-white dark:bg-bella-charcoal-soft",
        "transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(201,169,110,0.15)]",
        className
      )}
      onClick={() => onClick?.(product)}
      role="button"
      tabIndex={0}
      aria-label={`View ${product.name} details`}
      onKeyDown={(e) => e.key === "Enter" && onClick?.(product)}
    >
      {/* Color band */}
      <div
        className="h-64 w-full transition-transform duration-700 group-hover:scale-105 relative overflow-hidden"
        style={{ backgroundColor: product.color.primary }}
      >
        {/* Decorative gradient overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at 30% 40%, ${product.color.secondary}, transparent 70%)`,
          }}
        />
        {/* Brand watermark */}
        <div className="flex h-full items-center justify-center relative z-10">
          <span
            className="font-accent text-7xl tracking-wider opacity-15 select-none"
            style={{ color: product.color.text, fontFamily: "var(--font-italiana)" }}
          >
            B
          </span>
        </div>
        {/* Category badge */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-widest font-medium backdrop-blur-sm"
            style={{
              backgroundColor: `${product.color.secondary}CC`,
              color: product.color.text,
            }}
          >
            {product.category.replace(/-/g, " ")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-semibold text-bella-charcoal dark:text-bella-ivory">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-bella-gold font-medium">{product.subtitle}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-bella-stone">
          {product.description}
        </p>

        {/* Key benefits */}
        <ul className="mt-4 space-y-1.5">
          {product.keyBenefits.slice(0, 3).map((b, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-bella-stone">
              <span className="h-[1px] w-4 bg-bella-gold inline-block shrink-0" />
              {b}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-bella-gold/10 pt-4">
          <span className="text-xs text-bella-stone">{product.volume}</span>
          <Link
            href={{ pathname: "/products/[id]", params: { id: product.id } }}
            className="text-xs font-medium uppercase tracking-wider text-bella-gold group-hover:tracking-[0.2em] transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            Learn more →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
