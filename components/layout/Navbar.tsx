"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { brand } from "@/data/brand";
import {
  NAV_ALL,
  NAV_LEFT,
  NAV_RIGHT,
  type NavItem,
} from "@/data/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";
import { ItalyBadge } from "@/components/ui/ItalyBadge";

function NavLink({
  href,
  children,
  className,
}: {
  href: NavItem["href"];
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "group relative text-sm tracking-wide transition-colors duration-300",
        isActive
          ? "text-bella-gold"
          : "text-bella-stone hover:text-bella-charcoal dark:hover:text-white",
        className,
      )}
    >
      {children}
      <span
        className={cn(
          "absolute -bottom-0.5 start-0 h-px bg-bella-gold transition-all duration-300",
          isActive ? "w-full" : "w-0 group-hover:w-full",
        )}
      />
    </Link>
  );
}

function LangSwitcher({ scrolled }: { scrolled: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("nav");

  const toggle = () => {
    router.replace(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { pathname: pathname as any, params: params as any },
      { locale: locale === "en" ? "ar" : "en" },
    );
  };

  return (
    <button
      onClick={toggle}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium tracking-widest transition-all duration-300",
        scrolled
          ? "border-bella-gold/30 text-bella-stone hover:border-bella-gold hover:text-bella-gold"
          : "border-bella-charcoal/30 text-bella-stone hover:border-bella-gold hover:text-bella-gold dark:border-white/30 dark:text-white/70 dark:hover:border-white dark:hover:text-white",
      )}
      aria-label={t("ariaLangSwitch")}
    >
      {t("lang")}
    </button>
  );
}

function ThemeToggle({ scrolled }: { scrolled: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      onClick={toggle}
      className={cn(
        "relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300",
        scrolled
          ? "border-bella-gold/30 text-bella-stone hover:border-bella-gold hover:text-bella-gold"
          : "border-bella-charcoal/30 text-bella-stone hover:border-bella-gold hover:text-bella-gold dark:border-white/30 dark:text-white/70 dark:hover:border-white dark:hover:text-white",
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.svg
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </motion.svg>
        ) : (
          <motion.svg
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL, locale]);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => setScrolled(y > 80));
    return unsubscribe;
  }, [scrollY]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const instagramUrl = `https://instagram.com/${brand.instagram.replace("@", "")}`;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.9,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.1,
        }}
        className="fixed inset-x-0 top-0 z-50 overflow-hidden bg-transparent"
      >
        <motion.div
          initial={false}
          animate={{
            maxWidth: scrolled ? 880 : 1280,
            marginTop: scrolled ? 14 : 0,
            marginLeft: "auto",
            marginRight: "auto",
            paddingTop: scrolled ? 10 : 16,
            paddingBottom: scrolled ? 10 : 16,
            borderRadius: scrolled ? 999 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "w-full grid grid-cols-[1fr_auto_1fr] items-center border px-4 transition-colors duration-500 sm:px-6 lg:px-8",
            scrolled
              ? "border-bella-gold/15 bg-bella-ivory/90 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:bg-[#0E0E0C]/90"
              : "border-transparent bg-transparent",
          )}
        >
          <nav
            className="flex items-center justify-start gap-6"
            aria-label={t("ariaPrimary")}
          >
            <div className={cn("hidden items-center gap-8 lg:flex")}>
              {(isRTL ? NAV_RIGHT : NAV_LEFT).map((link) => (
                <NavLink key={link.key} href={link.href}>
                  {t(link.key)}
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="flex justify-center">
            <Link
              href="/"
              className="font-accent text-2xl tracking-[0.4em] text-bella-charcoal transition-colors duration-300 hover:text-bella-gold dark:text-white dark:hover:text-bella-gold"
              style={{ fontFamily: "var(--font-italiana)" }}
              aria-label={t("ariaLogoHome")}
            >
              {brand.name.toUpperCase()}
            </Link>
          </div>

          <div className="flex min-w-[44px] items-center justify-end gap-6">
            <div className="hidden items-center gap-8 lg:flex">
              {(isRTL ? NAV_LEFT : NAV_RIGHT).map((link) => (
                <NavLink key={link.key} href={link.href}>
                  {t(link.key)}
                </NavLink>
              ))}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <ThemeToggle scrolled={scrolled} />
              <LangSwitcher scrolled={scrolled} />
            </div>

            <button
              className="flex h-8 w-8 flex-col items-end justify-center gap-[5px] lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={t("ariaMenuToggle")}
              aria-expanded={menuOpen}
            >
              <motion.span
                animate={{
                  rotate: menuOpen ? (isRTL ? -45 : 45) : 0,
                  y: menuOpen ? 7 : 0,
                  width: "100%",
                }}
                className="block h-[1.5px] w-6 bg-bella-charcoal dark:bg-white"
              />
              <motion.span
                animate={{
                  opacity: menuOpen ? 0 : 1,
                  width: menuOpen ? 0 : "70%",
                }}
                className="block h-[1.5px] w-[70%] bg-bella-charcoal dark:bg-white"
              />
              <motion.span
                animate={{
                  rotate: menuOpen ? (isRTL ? 45 : -45) : 0,
                  y: menuOpen ? -7 : 0,
                  width: menuOpen ? "100%" : "45%",
                }}
                className="block h-[1.5px] w-[45%] bg-bella-charcoal dark:bg-white"
              />
            </button>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-hidden bg-bella-ivory dark:bg-[#0E0E0C]"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
              className={cn(
                "absolute inset-x-0 top-[72px] h-px bg-bella-gold/20",
                isRTL ? "origin-right" : "origin-left",
              )}
            />

            <div
              aria-hidden="true"
              className="font-accent pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[28vw] leading-none tracking-[0.08em] text-bella-charcoal opacity-[0.04] dark:text-white dark:opacity-[0.06]"
              style={{ fontFamily: "var(--font-italiana)" }}
            >
              {brand.name.toUpperCase()}
            </div>

            <div className="relative z-10 flex h-full flex-col px-8 pb-12 pt-28">
              <nav
                className="flex flex-1 flex-col justify-center gap-1"
                aria-label={t("ariaPrimary")}
              >
                {NAV_ALL.map((link, index) => (
                  <motion.div
                    key={link.key}
                    initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRTL ? 40 : -40 }}
                    transition={{
                      delay: index * 0.07,
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "group flex items-center border-b border-bella-gold/10 py-5 font-display text-3xl text-bella-charcoal/60 transition-colors duration-300 hover:text-bella-charcoal sm:text-4xl dark:text-white/50 dark:hover:text-white",
                        pathname === link.href && "!text-bella-gold",
                      )}
                    >
                      <span className="me-4 font-body text-xs text-bella-gold opacity-60">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {t(link.key)}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className={cn(
                  "flex items-center gap-8",
                  isRTL ? "justify-end" : "justify-start",
                )}
              >
                <ThemeToggle scrolled />
                <LangSwitcher scrolled />
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-wider text-bella-stone transition-colors hover:text-bella-gold"
                >
                  {t("instagram")}
                </a>
              </motion.div>

              {/* Italian Formula badge at bottom of mobile menu */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className={cn(
                  "mt-6 flex",
                  isRTL ? "justify-end" : "justify-start",
                )}
              >
                <ItalyBadge variant="inline" tone="light" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
