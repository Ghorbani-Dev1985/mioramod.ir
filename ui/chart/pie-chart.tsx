"use client";

import {
  Pie,
  PieChart,
  Cell,
} from "recharts";

const COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

export function PieChartComponent({
  data,
}: {
  data: any[];
}) {
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
      >
        {data.map((_, index) => (
          <Cell
            key={index}
            fill={
              COLORS[
                index % COLORS.length
              ]
            }
          />
        ))}
      </Pie>
    </PieChart>
  );
}