import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bella: {
          gold:        "#C9A96E",
          "gold-light":"#E8D5A3",
          "gold-dark": "#A07840",
          blush:       "#F9EEF0",
          "blush-deep":"#EDD5D9",
          ivory:       "#FAF8F5",
          charcoal:    "#1A1A1A",
          "charcoal-soft": "#2C2C2A",
          mist:        "#F2EFEA",
          "mist-dark": "#E5E0D8",
          stone:       "#8B8680",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body:    ["var(--font-dm-sans)",   "system-ui", "sans-serif"],
        accent:  ["var(--font-italiana)", "Georgia", "serif"],
      },
      fontSize: {
        "fluid-sm":  "clamp(0.875rem, 1.5vw, 1rem)",
        "fluid-base":"clamp(1rem, 2vw, 1.125rem)",
        "fluid-lg":  "clamp(1.25rem, 3vw, 1.5rem)",
        "fluid-xl":  "clamp(1.5rem, 4vw, 2rem)",
        "fluid-2xl": "clamp(2rem, 5vw, 3rem)",
        "fluid-3xl": "clamp(2.5rem, 7vw, 4.5rem)",
        "fluid-4xl": "clamp(3rem, 10vw, 7rem)",
        "fluid-hero":"clamp(3.5rem, 12vw, 9rem)",
      },
      spacing: {
        section: "clamp(5rem, 10vw, 9rem)",
        "section-sm": "clamp(3rem, 6vw, 5rem)",
      },
      transitionTimingFunction: {
        "bella-ease":     "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "bella-spring":   "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "bella-smooth":   "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
      },
      animation: {
        "marquee":     "marquee 35s linear infinite",
        "marquee-rev": "marquee-rev 35s linear infinite",
        "fade-up":     "fadeUp 0.8s bella-ease forwards",
        "shimmer":     "shimmer 2.5s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0%)" },
          to:   { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          from: { transform: "translateX(-50%)" },
          to:   { transform: "translateX(0%)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%":       { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
