"use client";

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";

import { Props } from "./chart.types";



export function LineChartComponent({
  data,
}: Props) {
  return (
    <ChartContainer
      config={{
        value: {
          label: "مقدار",
          color: "#2563EB",
        },
      }}
      height={320}
    >
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
        />

        <XAxis dataKey="name" />

        <YAxis />

        <ChartTooltip
          content={
            <ChartTooltipContent />
          }
        />

        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--color-value)"
          strokeWidth={3}
        />
      </LineChart>
    </ChartContainer>
  );
}