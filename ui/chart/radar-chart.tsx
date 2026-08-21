"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";

export function RadarChartComponent({
  data,
}: {
  data: any[];
}) {
  return (
    <RadarChart
      width={500}
      height={300}
      data={data}
    >
      <PolarGrid />

      <PolarAngleAxis
        dataKey="name"
      />

      <Radar
        dataKey="value"
        fill="#2563EB"
        fillOpacity={0.4}
      />
    </RadarChart>
  );
}