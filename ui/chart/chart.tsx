"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/core/utils/shadcn.utils";
import type { ChartConfig, ChartContextProps } from "./chart.types";

const ChartContext = React.createContext<ChartContextProps | null>(null);

export function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used inside ChartContainer");
  }

  return context;
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;

  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];

  height?: number;
}

export function ChartContainer({
  config,
  children,
  className,
  height = 350,
  ...props
}: ChartContainerProps) {
  const chartId = React.useId();

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={cn(
          [
            "w-full",

            "[&_.recharts-cartesian-axis-tick_text]:fill-neutral-500",

            "[&_.recharts-cartesian-grid_line]:stroke-neutral-200",

            "[&_.recharts-tooltip-cursor]:stroke-neutral-300",

            "[&_.recharts-surface]:outline-none",
          ],
          className,
        )}
        {...props}>
        <ChartStyle config={config} />

        <div
          style={{
            width: "100%",
            height,
          }}>
          <RechartsPrimitive.ResponsiveContainer>
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        </div>
      </div>
    </ChartContext.Provider>
  );
}

function ChartStyle({ config }: { config: ChartConfig }) {
  const styles = Object.entries(config)
    .map(([key, value]) => {
      if (!value.color) return "";

      return `--color-${key}: ${value.color};`;
    })
    .join("\n");

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          [data-chart] {
            ${styles}
          }
        `,
      }}
    />
  );
}
