"use client";

import { Tooltip } from "recharts";

interface ChartTooltipContentProps {
  active?: boolean;

  payload?: any[];

  label?: string;
}

export function ChartTooltipContent({
  active,
  payload,
  label,
}: ChartTooltipContentProps) {
  if (
    !active ||
    !payload ||
    !payload.length
  ) {
    return null;
  }

  return (
    <div
      className="
      min-w-40
      rounded-lg
      border
      bg-white
      p-3
      shadow-lg
      "
    >
      {label && (
        <p
          className="
          mb-2
          text-sm
          font-semibold
          "
        >
          {label}
        </p>
      )}

      <div className="space-y-2">
        {payload.map(
          (item, index) => (
            <div
              key={index}
              className="
              flex
              items-center
              justify-between
              gap-4
              "
            >
              <div
                className="
                flex
                items-center
                gap-2
                "
              >
                <span
                  className="
                  size-2
                  rounded-full
                  "
                  style={{
                    background:
                      item.color,
                  }}
                />

                <span
                  className="
                  text-xs
                  text-neutral-600
                  "
                >
                  {item.name}
                </span>
              </div>

              <span
                className="
                text-xs
                font-semibold
                "
              >
                {item.value?.toLocaleString(
                  "fa-IR"
                )}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export function ChartTooltip(props: Record<string, unknown>) {
  return <Tooltip content={<ChartTooltipContent />} {...props} />;
}