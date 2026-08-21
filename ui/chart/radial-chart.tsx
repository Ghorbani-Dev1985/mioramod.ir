"use client";

import {
  RadialBarChart,
  RadialBar,
  Cell,
} from "recharts";

interface RadialChartItem {
  name: string;
  value: number;
  color?: string;
}

interface Props {
  data: RadialChartItem[];
}

export function RadialChart({
  data,
}: Props) {
  return (
    <RadialBarChart
      width={185}
      height={231}
      innerRadius="40%"
      outerRadius="100%"
      data={data}
    >
      <RadialBar
        dataKey="value"
        background
      >
        {data.map(
          (entry, index) => (
            <Cell
              key={index}
              fill={entry.color}
            />
          )
        )}
      </RadialBar>
    </RadialBarChart>
  );
}