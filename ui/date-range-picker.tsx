"use client";

import * as React from "react";

import {
  endOfToday,
  endOfMonth,
  startOfMonth,
  startOfToday,
  subDays,
  subMonths,
} from "date-fns-jalali";
import jalaali from "jalaali-js";

import type { DateRange } from "react-day-picker";

import { CalendarIcon } from "lucide-react";

import { cn } from "@/core/utils/shadcn.utils";

import { formatDisplayDate } from "@/core/utils/persian-date.utils";

import { Button } from "@/shared/ui/button";

import { Calendar, type JalaliDate, type Range } from "@/shared/ui/calendar";

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

function toJalali(date: Date): JalaliDate {
  const greg = { gy: date.getFullYear(), gm: date.getMonth() + 1, gd: date.getDate() };
  return jalaali.toJalaali(greg.gy, greg.gm, greg.gd);
}

function toDate(jalali: JalaliDate): Date {
  const greg = jalaali.toGregorian(jalali.jy, jalali.jm, jalali.jd);
  return new Date(greg.gy, greg.gm - 1, greg.gd);
}

function toRange(value: DateRange): Range {
  return {
    from: value.from ? toJalali(value.from) : undefined,
    to: value.to ? toJalali(value.to) : undefined,
  };
}

function toDateRange(range: Range): DateRange {
  return {
    from: range.from ? toDate(range.from) : undefined,
    to: range.to ? toDate(range.to) : undefined,
  };
}

interface DateRangePickerProps {
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  numberOfMonths?: number;
}

function DateRangePicker({
  value,
  defaultValue,
  onChange,
  placeholder = "انتخاب بازه",
  className,
  disabled,
}: DateRangePickerProps) {
  const isControlled = value !== undefined;
  const [uncontrolledDate, setUncontrolledDate] = React.useState<DateRange | undefined>(defaultValue);
  const selectedDate = isControlled ? value : uncontrolledDate;

  const setSelectedDate = (range: DateRange | undefined) => {
    if (!isControlled) setUncontrolledDate(range);
    onChange?.(range);
  };

  const [open, setOpen] = React.useState(false);
  const [draftValue, setDraftValue] = React.useState<Range | undefined>(
    selectedDate ? toRange(selectedDate) : undefined,
  );

  const handleConfirm = (range: Range) => {
    setSelectedDate(toDateRange(range));
    setOpen(false);
  };

  const handleCancel = () => setOpen(false);

  const handleClear = () => {
    setDraftValue(undefined);
    setSelectedDate(undefined);
    setOpen(false);
  };

  const presets = [
    {
      label: "امروز",
      action: () => {
        const today = startOfToday();
        setDraftValue({ from: toJalali(today), to: toJalali(endOfToday()) });
      },
    },
    {
      label: "۷ روز گذشته",
      action: () => {
        const today = startOfToday();
        setDraftValue({ from: toJalali(subDays(today, 6)), to: toJalali(endOfToday()) });
      },
    },
    {
      label: "۳۰ روز گذشته",
      action: () => {
        const today = startOfToday();
        setDraftValue({ from: toJalali(subDays(today, 29)), to: toJalali(endOfToday()) });
      },
    },
    {
      label: "ماه گذشته",
      action: () => {
        const today = startOfToday();
        setDraftValue({
          from: toJalali(startOfMonth(subMonths(today, 1))),
          to: toJalali(endOfMonth(subMonths(today, 1))),
        });
      },
    },
  ];

  const displayText = React.useMemo(() => {
    if (!selectedDate?.from) return placeholder;
    if (selectedDate.to) {
      return `${formatDisplayDate(selectedDate.from)} - ${formatDisplayDate(selectedDate.to)}`;
    }
    return formatDisplayDate(selectedDate.from);
  }, [selectedDate, placeholder]);

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) {
          setDraftValue(selectedDate ? toRange(selectedDate) : undefined);
        }
        setOpen(nextOpen);
      }}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-between text-right font-normal",
            !selectedDate && "text-muted-foreground",
            className,
          )}>
          <span>{displayText}</span>
          <CalendarIcon className="size-4 shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-auto overflow-hidden p-0">
        <div className="flex flex-col md:flex-row">
          <Calendar
            mode="range"
            rangeValue={draftValue}
            onRangeChange={setDraftValue}
          />

          <div className={cn("border-s flex min-w-47.5 flex-col gap-2 bg-muted/20 p-3")}>
            {presets.map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                className="justify-start"
                onClick={preset.action}>
                {preset.label}
              </Button>
            ))}

            <div className="my-2 border-t" />

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1" onClick={handleCancel}>
                انصراف
              </Button>
              <Button size="sm" className="flex-1" onClick={() => draftValue && handleConfirm(draftValue)}>
                تایید
              </Button>
            </div>

            <Button
              size="sm"
              variant="outline"
              className="text-error-500 hover:text-error-600"
              onClick={handleClear}>
              پاک کردن
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

DateRangePicker.displayName = "DateRangePicker";

export { DateRangePicker };
