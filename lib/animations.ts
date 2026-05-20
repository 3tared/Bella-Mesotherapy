import { Variants } from "framer-motion";

/* ── Fade up (section enter) ─────────────────────── */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ── Stagger container ───────────────────────────── */
export const staggerContainer: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/* ── Card reveal ─────────────────────────────────── */
export const cardReveal: Variants = {
  hidden:  { opacity: 0, y: 60, scale: 0.97 },
  visible: {
    opacity: 1,
    y:       0,
    scale:   1,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ── Clip reveal (text wipe) ─────────────────────── */
export const clipReveal: Variants = {
  hidden:  { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
  },
};

/* ── Line draw ───────────────────────────────────── */
export const lineDraw: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.0, ease: [0.65, 0, 0.35, 1] },
  },
};

/* ── Image zoom ──────────────────────────────────── */
export const imageZoom: Variants = {
  hidden:  { scale: 1.1, opacity: 0 },
  visible: {
    scale:   1,
    opacity: 1,
    transition: { duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};
