import { ChartConfig } from "./chart.types";

export function getConfigColor(
  config: ChartConfig,
  key: string,
  theme: "light" | "dark" = "light"
) {
  const item = config[key];

  if (!item) return undefined;

  if (item.color) {
    return item.color;
  }

  if (item.theme) {
    return item.theme[theme];
  }

  return undefined;
}

export function formatNumber(
  value: number
) {
  return value.toLocaleString(
    "fa-IR"
  );
}

export function percentage(
  value: number,
  max: number
) {
  if (!max) return 0;

  return Math.round(
    (value / max) * 100
  );
}