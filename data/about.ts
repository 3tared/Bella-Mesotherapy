import { brand } from "./brand";

export const aboutStats = brand.stats.map((stat) => {
  const match = stat.value.match(/^(\d+)(.*)$/);

  return {
    value: stat.value,
    numericValue: match ? Number(match[1]) : 0,
    suffix: match?.[2] ?? "",
  };
});

export const valuePrinciples = [
  { key: "purity", icon: "purity" },
  { key: "precision", icon: "precision" },
  { key: "transformation", icon: "transformation" },
] as const;

export const timelineMilestones = [
  { key: "origin" },
  { key: "research" },
  { key: "launch" },
  { key: "region" },
] as const;

export const certificationBadges = [
  { key: "gmp" },
  { key: "pharma" },
  { key: "derm" },
  { key: "global" },
  { key: "clinical" },
] as const;
