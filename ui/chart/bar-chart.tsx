"use client";

import {
  Bar,
  BarChart,
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

export function BarChartComponent({
  data,
}: {
  data: any[];
}) {
  return (
    <ChartContainer
      config={{
        value: {
          label: "تعداد",
          color: "#10B981",
        },
      }}
      className="h-80"
    >
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />

        <ChartTooltip
          content={<ChartTooltipContent />}
        />

        <Bar
          dataKey="value"
          fill="var(--color-value)"
          radius={8}
        />
      </BarChart>
    </ChartContainer>
  );
}