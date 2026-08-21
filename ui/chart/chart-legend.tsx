"use client";

interface ChartLegendItem {
  color: string;

  label: string;
}

interface ChartLegendProps {
  items: ChartLegendItem[];
}

export function ChartLegend({
  items,
}: ChartLegendProps) {
  return (
    <div
      className="
      flex
      flex-wrap
      items-center
      justify-center
      gap-6
      pt-4
      "
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="
          flex
          items-center
          gap-2
          "
        >
          <span
            className="
            size-3
            rounded-full
            "
            style={{
              backgroundColor:
                item.color,
            }}
          />

          <span
            className="
            text-sm
            text-neutral-600
            "
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}