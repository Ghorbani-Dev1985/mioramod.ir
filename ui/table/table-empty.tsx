"use client";

import { InboxIcon } from "lucide-react";

export function TableEmpty({
  message = "داده‌ای یافت نشد",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <InboxIcon className="size-10 text-neutral-300" />

      <p className="text-neutral-500">
        {message}
      </p>
    </div>
  );
}