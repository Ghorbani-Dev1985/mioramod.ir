"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { cva, type VariantProps } from "class-variance-authority";

import { CHART_COLORS } from "./chart.config";

const chartVariants = cva("", {
  variants: {
    variant: {
      primary: "",
      secondary: "",
      success: "",
      error: "",
      warning: "",
      info: ""
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

const variantColors = {
  primary: CHART_COLORS.primary,
  secondary: CHART_COLORS.secondary,
  success: CHART_COLORS.success,
  error: CHART_COLORS.error,
  warning: CHART_COLORS.warning,
  info: CHART_COLORS.info
} as const;

interface SparklineAreaChartProps
  extends VariantProps<typeof chartVariants> {
  data: {
    value: number;
  }[];
  showArea?: boolean;
}

export function SparklineAreaChart({
  data,
  showArea = false,
  variant = "primary",
}: SparklineAreaChartProps) {
  const firstValue = data[0]?.value ?? 0;
  const lastValue = data[data.length - 1]?.value ?? 0;

  const isPositive = lastValue >= firstValue;

  const strokeColor = isPositive
    ? variantColors[variant ?? "primary"]
    : CHART_COLORS.error;

  return (
    <div className="h-20 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity={0.3} />
              <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <Tooltip />

          <Area
            type="bump"
            dataKey="value"
            stroke={strokeColor}
            strokeWidth={2}
            fill={showArea ? "url(#areaGradient)" : "transparent"}
            dot={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}