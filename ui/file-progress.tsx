"use client";

import { cn } from "@/core/utils/shadcn.utils";
import { AlertCircle, CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { Button } from "./button";
import { Progress } from "./progress";

export interface FileProgressProps {
  value: number;
  max: number;
  unit?: string;
  status?: "uploading" | "error" | "success" | "idle";
  fileName?: string;
  onRetry?: () => void;
  className?: string;
  showPercent?: boolean;
}

const StatusIcon = ({
  status,
}: {
  status: FileProgressProps["status"];
}) => {
  switch (status) {
    case "error":
      return <AlertCircle className="size-4 text-error-500" />;
    case "success":
      return <CheckCircle2 className="size-4 text-success-500" />;
    case "uploading":
      return <Loader2 className="size-4 text-primary-500 animate-spin" />;
    default:
      return null;
  }
};

const progressVariantByStatus: Record<
  NonNullable<FileProgressProps["status"]>,
  "primary" | "success" | "error"
> = {
  uploading: "primary",
  success: "success",
  error: "error",
  idle: "primary",
};

export function FileProgress({
  value,
  max,
  unit = "MB",
  status = "uploading",
  onRetry,
  className,
  showPercent = true,
}: FileProgressProps) {
  const percentage = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  const formattedValue = formatBytes(value, unit);
  const formattedMax = formatBytes(max, unit);

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <StatusIcon status={status} />
          <span className="text-neutral-800">
            {status === "uploading" && "در حال آپلود"}
            {status === "error" && "خطا در پردازش کلی عملیات وارد کردن"}
            {status === "success" && "آپلود با موفقیت انجام شد"}
            {status === "idle" && "آماده آپلود"}
          </span>
        </div>
        {showPercent &&
        <div className="text-sm">
          {Math.round(percentage)}%
        </div>
        }
      </div>

      <Progress
        value={percentage}
        variant={progressVariantByStatus[status]}
        className="h-2.5"
      />

      <div className="flex-between text-xs">
        <span className="text-neutral-500">
          {formattedValue} {unit} از {formattedMax} {unit}
        </span>
        {status === "error" && onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="h-7 gap-1 text-destructive"
          >
            <RefreshCw className="h-3 w-3" />
            مجدد تلاش کنید
          </Button>
        )}
      </div>
    </div>
  );
}

function formatBytes(value: number, unit: string): string {
  if (unit === "MB") return value.toFixed(0);
  if (unit === "KB") return (value / 1024).toFixed(0);
  if (unit === "GB") return (value / 1024 / 1024).toFixed(1);
  return value.toString();
}
