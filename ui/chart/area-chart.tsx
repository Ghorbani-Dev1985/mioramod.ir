"use client";

import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
} from "./chart";
import {
  ChartTooltip,
  ChartTooltipContent,
} from "./chart-tooltip";

export function AreaChartComponent({
  data,
}: {
  data: any[];
}) {
  return (
    <ChartContainer
      config={{
        value: {
          label: "مقدار",
          color: "#2563EB",
        },
      }}
      className="h-80"
    >
      <AreaChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />

        <ChartTooltip
          content={<ChartTooltipContent />}
        />

        <Area
          dataKey="value"
          stroke="var(--color-value)"
          fill="var(--color-value)"
        />
      </AreaChart>
    </ChartContainer>
  );
}