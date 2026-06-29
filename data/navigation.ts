import { routing } from "@/i18n/routing";

export type AppPathname = Exclude<
  keyof typeof routing.pathnames,
  "/products/[id]"
>;

export interface NavItem {
  key: "home" | "about" | "products" | "gallery" | "contact";
  href: AppPathname;
}

export const NAV_LEFT: NavItem[] = [
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
];

export const NAV_RIGHT: NavItem[] = [
  { key: "gallery", href: "/gallery" },
  { key: "contact", href: "/contact" },
];

export const NAV_ALL: NavItem[] = [
  { key: "home", href: "/" },
  ...NAV_LEFT,
  ...NAV_RIGHT,
];
