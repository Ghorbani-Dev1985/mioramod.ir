"use client";

import { PieChart, Pie, ResponsiveContainer, Sector } from "recharts";
import { DonutChartProps } from "./chart.types";

export function DonutChart({ data }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex-between flex-col md:flex-row gap-8">
      {/* Chart */}

      {/* Legend */}

      <div className="space-y-4 self-start md:self-end">
        {data.map((item) => {
          const percent = Math.round((item.value / total) * 100);

          return (
            <div key={item.name} className="flex items-center gap-3">
              <span
                className="size-4 rounded-xl"
                style={{
                  backgroundColor: item.fill,
                }}
              />

              <p className="text-neutral-600">{percent}%</p>

              <p className="min-w-24 text-sm">{item.name}</p>

            </div>
          );
        })}
      </div>
      <div className="size-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={0}
              strokeWidth={0}
              shape={(props) => <Sector {...props} />}></Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
