"use client";

import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { cn } from "@/core/utils/shadcn.utils";
import { VariantProps } from "class-variance-authority";
import { radialProgressVariants } from "./radial-progress-chart-variants";

const variantColorMap: Record<string, string> = {
  primary: "var(--color-primary-500)",
  secondary: "var(--color-secondary-500)",
  success: "var(--color-success-500)",
  error: "var(--color-error-500)",
  warning: "var(--color-warning-500)",
  info: "var(--color-info-500)",
  neutral: "var(--color-neutral-500)",
  purple: "var(--color-purple-500)",
};

interface RadialProgressChartProps extends VariantProps<typeof radialProgressVariants> {
  value: number;
  size?: number;
  innerRadius?: number;
  outerRadius?: number;
  cornerRadius?: number;
  showPercentage?: boolean;
  className?: string;
}

export function RadialProgressChart({
  value,
  variant = "primary",
  size = 180,
  innerRadius = 75,
  outerRadius = 95,
  cornerRadius = 10,
  showPercentage = true,
  className,
}: RadialProgressChartProps) {
  const clampedValue = Math.max(0, Math.min(100, value));
  const color = variantColorMap[variant ?? "primary"];

  return (
    <div
      className={cn(
        "relative size-20 inline-flex items-center justify-center",
        radialProgressVariants({ variant }),
        className,
      )}
    >
      <RadialBarChart
        width={size}
        height={size}
        data={[{ value: clampedValue }]}
        startAngle={90}
        endAngle={-270}
        innerRadius={`${innerRadius}%`}
        outerRadius={`${outerRadius}%`}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          tick={false}
        />
        <RadialBar
          dataKey="value"
          cornerRadius={cornerRadius}
          background
          fill={color}
        />
      </RadialBarChart>
      {showPercentage && (
        <div className="pointer-events-none absolute inset-0 flex-center">
          <span
            className="text-lg"
          >
            {clampedValue}%
          </span>
        </div>
      )}
    </div>
  );
}
