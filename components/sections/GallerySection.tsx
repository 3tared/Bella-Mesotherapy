"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { MarqueeTrack }   from "@/components/ui/MarqueeTrack";
import { fadeUp }         from "@/lib/animations";
import { SECTION_IDS }    from "@/lib/constants";

const galleryItems = [
  { label: "Hydra Boost Vial",        color: "#DDEEF8", accent: "#1A4A6E" },
  { label: "Radiance Elixir Vial",    color: "#FDF3D8", accent: "#6B4E00" },
  { label: "Youth Peptide Complex",   color: "#F0EAF8", accent: "#3D1A6E" },
  { label: "Repair Shield Formula",   color: "#E8F5EC", accent: "#1A4E2A" },
  { label: "Clinical Application",    color: "#F9EEF0", accent: "#8B4C5A" },
  { label: "Treatment Room",          color: "#F2EFEA", accent: "#8B8680" },
];

function GalleryCard({ item }: { item: (typeof galleryItems)[0] }) {
  return (
    <div
      className="group relative h-72 w-56 flex-shrink-0 overflow-hidden rounded-2xl border border-bella-gold/10 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(201,169,110,0.15)]"
      style={{ backgroundColor: item.color }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${item.accent}33, transparent 70%)`,
        }}
      />

      {/* Brand watermark */}
      <div className="flex h-full items-center justify-center">
        <span
          className="font-accent text-8xl tracking-wider opacity-10 select-none transition-opacity duration-500 group-hover:opacity-20"
          style={{ color: item.accent, fontFamily: "var(--font-italiana)" }}
        >
          B
        </span>
      </div>

      {/* Label overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-4">
        <p className="text-xs font-medium tracking-wider text-white/80">
          {item.label}
        </p>
      </div>

      {/* Hover border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-bella-gold/0 transition-all duration-500 group-hover:border-bella-gold/30" />
    </div>
  );
}

export function GallerySection() {
  return (
    <SectionWrapper id={SECTION_IDS.gallery} noPadding className="py-section-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12">
        <motion.div variants={fadeUp} className="text-center">
          <p className="mb-3 text-sm tracking-[0.25em] uppercase text-bella-gold">
            Gallery
          </p>
          <h2 className="font-display text-fluid-3xl leading-tight text-bella-charcoal dark:text-bella-ivory">
            The Bella aesthetic
          </h2>
        </motion.div>
      </div>

      {/* Marquee row 1 */}
      <div className="mb-4">
        <MarqueeTrack speed="base">
          {galleryItems.map((item, i) => (
            <GalleryCard key={i} item={item} />
          ))}
        </MarqueeTrack>
      </div>

      {/* Marquee row 2 (reversed) */}
      <MarqueeTrack speed="slow" reverse>
        {[...galleryItems].reverse().map((item, i) => (
          <GalleryCard key={i} item={item} />
        ))}
      </MarqueeTrack>
    </SectionWrapper>
  );
}
