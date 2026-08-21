import { cn } from "@/core/utils/shadcn.utils";
import ToLocalStringNumber from "@/core/utils/to-local-string-num.utils";

interface StatisticsProgressProps {
  label: string;
  value: number;
  max: number;
  className?: string;
}

export function StatisticsProgress({
  label,
  value,
  max,
  className,
}: StatisticsProgressProps) {
  const percentage = (value / max) * 100;
  const isTextOnBlue = percentage > 50;
  return (
    <div
      className={cn(
        "flex items-center gap-8",
        className
      )}
    >
      <p className="min-w-24 text-lg font-semibold">
        {label}
      </p>

      <div className="relative h-5 flex-1 overflow-hidden rounded-full bg-neutral-300">
        <div
          className="
            absolute
            right-0
            top-0
            h-full
            rounded-full
            bg-primary-500
            transition-all
          "
          style={{
            width: `${percentage}%`,
          }}
        />

        <span
          className={cn(
            `
            absolute
            inset-0
            flex
            items-center
            justify-center
            text-lg
            font-semibold
            transition-colors
            duration-300
            `,
            isTextOnBlue
              ? "text-white"
              : "text-neutral-800"
          )}
          >
          {ToLocalStringNumber(value)}
        </span>
          </div>
    </div>
  );
}