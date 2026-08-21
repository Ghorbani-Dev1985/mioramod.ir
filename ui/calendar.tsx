"use client";

import { ReactNode, useMemo, useState } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import jalaali from "jalaali-js";
import { cn } from "@/core/utils/shadcn.utils";
import { Button, buttonVariants } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const PERSIAN_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

// Weekday headers, right-to-left starting Saturday
const WEEKDAYS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

function toPersianDigits(input: string | number): string {
  const digits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(input).replace(/\d/g, (d) => digits[Number(d)]);
}

export type JalaliDate = { jy: number; jm: number; jd: number };
export type Range = { from?: JalaliDate; to?: JalaliDate };

// Format a single Jalali date like "۲۵ مهر ۱۴۰۰"
export function formatJalali(d: JalaliDate): string {
  return `${toPersianDigits(d.jd)} ${PERSIAN_MONTHS[d.jm - 1]} ${toPersianDigits(d.jy)}`;
}

function sameDay(a: JalaliDate, b: JalaliDate) {
  return a.jy === b.jy && a.jm === b.jm && a.jd === b.jd;
}

// comparable number for ordering
function dateKey(d: JalaliDate) {
  return d.jy * 10000 + d.jm * 100 + d.jd;
}

// JS getDay(): 0=Sun..6=Sat. Map so Saturday=0 ... Friday=6
function persianWeekIndex(gy: number, gm: number, gd: number) {
  const day = new Date(gy, gm - 1, gd).getDay();
  return (day + 1) % 7;
}

function todayJalali(): JalaliDate {
  const now = new Date();
  return jalaali.toJalaali(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate(),
  );
}

// add N days to a Jalali date via Gregorian
function addDays(d: JalaliDate, days: number): JalaliDate {
  const g = jalaali.toGregorian(d.jy, d.jm, d.jd);
  const date = new Date(g.gy, g.gm - 1, g.gd);
  date.setDate(date.getDate() + days);
  return jalaali.toJalaali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
}

// returns true if the given Jalali date falls on a Friday
function isFriday(d: JalaliDate) {
  const g = jalaali.toGregorian(d.jy, d.jm, d.jd);
  return persianWeekIndex(g.gy, g.gm, g.gd) === 6;
}

const PRESETS = ["سفارشی", "امروز", "۷ روز گذشته", "ماه گذشته"] as const;
type Preset = (typeof PRESETS)[number];

interface PersianCalendarProps {
  mode?: "single" | "range";
  value?: JalaliDate;
  rangeValue?: Range;
  onChange?: (date: JalaliDate) => void;
  onRangeChange?: (range: Range) => void;
  className?: string;
  onConfirm?: (value: JalaliDate | Range) => void;
  onCancel?: () => void;
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "center" | "end";
  triggerClassName?: string;
  showFooter?: boolean;
}

export function Calendar({
  mode = "single",
  value,
  rangeValue,
  onChange,
  onRangeChange,
  className,
  onConfirm,
  onCancel,
  trigger,
  open,
  onOpenChange,
  align = "start",
  triggerClassName,
  showFooter = true,
}: PersianCalendarProps) {
  const today = useMemo<JalaliDate>(() => todayJalali(), []);

  const [selected, setSelected] = useState<JalaliDate | undefined>(value);
  const [range, setRange] = useState<Range>(rangeValue ?? {});
  const [activePreset, setActivePreset] = useState<Preset>("سفارشی");
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const popoverOpen = isControlled ? open : internalOpen;
  const setPopoverOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const initial = value ?? rangeValue?.from ?? today;
  const [viewYear, setViewYear] = useState(initial.jy);
  const [viewMonth, setViewMonth] = useState(initial.jm);

  const cells = useMemo(() => {
    const daysInMonth = jalaali.jalaaliMonthLength(viewYear, viewMonth);
    const firstGregorian = jalaali.toGregorian(viewYear, viewMonth, 1);
    const startOffset = persianWeekIndex(
      firstGregorian.gy,
      firstGregorian.gm,
      firstGregorian.gd,
    );

    const prevMonth = viewMonth === 1 ? 12 : viewMonth - 1;
    const prevYear = viewMonth === 1 ? viewYear - 1 : viewYear;
    const daysInPrev = jalaali.jalaaliMonthLength(prevYear, prevMonth);

    const nextMonth = viewMonth === 12 ? 1 : viewMonth + 1;
    const nextYear = viewMonth === 12 ? viewYear + 1 : viewYear;

    const result: { date: JalaliDate; outside: boolean }[] = [];

    for (let i = startOffset - 1; i >= 0; i--) {
      result.push({
        date: { jy: prevYear, jm: prevMonth, jd: daysInPrev - i },
        outside: true,
      });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      result.push({
        date: { jy: viewYear, jm: viewMonth, jd: d },
        outside: false,
      });
    }
    let nextDay = 1;
    while (result.length % 7 !== 0) {
      result.push({
        date: { jy: nextYear, jm: nextMonth, jd: nextDay++ },
        outside: true,
      });
    }

    return result;
  }, [viewYear, viewMonth]);

  const goPrevMonth = () => {
    if (viewMonth === 1) {
      setViewMonth(12);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (viewMonth === 12) {
      setViewMonth(1);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const goToMonth = (d: JalaliDate) => {
    setViewYear(d.jy);
    setViewMonth(d.jm);
  };

  const handleSelect = (date: JalaliDate) => {
    if (mode === "single") {
      setSelected(date);
      onChange?.(date);
      return;
    }

    // range mode
    setActivePreset("سفارشی");
    setRange((prev) => {
      let next: Range;
      if (!prev.from || (prev.from && prev.to)) {
        // start a new range
        next = { from: date };
      } else {
        // set the end, ordering correctly
        if (dateKey(date) < dateKey(prev.from)) {
          next = { from: date, to: prev.from };
        } else {
          next = { from: prev.from, to: date };
        }
      }
      onRangeChange?.(next);
      return next;
    });
  };

  const applyPreset = (preset: Preset) => {
    setActivePreset(preset);
    if (preset === "سفارشی") return;

    let next: Range;
    if (preset === "امروز") {
      next = { from: today, to: today };
    } else if (preset === "۷ روز گذشته") {
      next = { from: addDays(today, -6), to: today };
    } else {
      next = { from: addDays(today, -29), to: today };
    }
    setRange(next);
    onRangeChange?.(next);
    if (next.from) goToMonth(next.from);
  };

  const clearRange = () => {
    setRange({});
    setActivePreset("سفارشی");
    onRangeChange?.({});
  };

  const headerLabel = () => {
    if (mode === "range") {
      if (range.from && range.to) {
        return `از ${toPersianDigits(range.from.jd)} تا ${toPersianDigits(
          range.to.jd,
        )} ${PERSIAN_MONTHS[viewMonth - 1]} ${toPersianDigits(viewYear)}`;
      }
      if (range.from) {
        return `از ${toPersianDigits(range.from.jd)} ${
          PERSIAN_MONTHS[range.from.jm - 1]
        } ${toPersianDigits(range.from.jy)}`;
      }
      return `${PERSIAN_MONTHS[viewMonth - 1]} ${toPersianDigits(viewYear)}`;
    }
    return `${toPersianDigits(today.jd)} ${PERSIAN_MONTHS[viewMonth - 1]} ${toPersianDigits(
      viewYear,
    )}`;
  };
  const handleConfirm = () => {
    if (mode === "range") onConfirm?.(range);
    else if (selected) onConfirm?.(selected);
    if (trigger) setPopoverOpen(false);
  };
  const handleCancel = () => {
    onCancel?.();
    if (trigger) setPopoverOpen(false);
  };

  const FHCalender = (
    <div className={cn("w-85 rounded-2xl p-4 shadow-main", className)}>
      {/* Header */}
      <div className="w-full flex-between px-2 py-2">
        <button
          type="button"
          onClick={goNextMonth}
          aria-label="ماه بعد"
          className="flex-center size-8  rounded-md text-neutral-800 transition-colors hover:bg-muted hover:text-foreground">
          <ChevronRight className="size-5" />
        </button>
        <span className="text-base font-medium text-foreground">
          {headerLabel()}
        </span>
        <button
          type="button"
          onClick={goPrevMonth}
          aria-label="ماه قبل"
          className="flex-center size-8  rounded-md text-neutral-800 transition-colors hover:bg-neutral-100 hover:text-foreground">
          <ChevronLeft className="size-5" />
        </button>
      </div>

      {/* Preset tabs (range mode only) */}
      {mode === "range" && (
        <div className="w-full mt-1 flex-between px-1">
          {PRESETS.map((preset) => {
            const active = preset === activePreset;
            return (
              <button
                key={preset}
                type="button"
                onClick={() => applyPreset(preset)}
                className={cn(
                  "border-b-2 border-transparent px-1 pb-1 text-sm transition-colors",
                  active
                    ? "text-primary-500 border-primary-500 font-medium"
                    : "text-neutral-800 hover:text-foreground",
                )}>
                {preset}
              </button>
            );
          })}
        </div>
      )}

      {/* Weekday row */}
      <div className="mt-2 grid grid-cols-7">
        {WEEKDAYS.map((w) => (
          <div key={w} className="flex-center size-9 text-neutral-300">
            {w}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className={cn("mt-1 grid grid-cols-7")}>
        {cells.map((cell, idx) => {
          const isSingleSelected =
            mode === "single" &&
            selected &&
            sameDay(cell.date, selected) &&
            !cell.outside;

          const k = dateKey(cell.date);
          const fromK = range.from ? dateKey(range.from) : undefined;
          const toK = range.to ? dateKey(range.to) : undefined;

          const isRangeStart =
            mode === "range" && fromK !== undefined && k === fromK;
          const isRangeEnd = mode === "range" && toK !== undefined && k === toK;
          const isInRange =
            mode === "range" &&
            fromK !== undefined &&
            toK !== undefined &&
            k > fromK &&
            k < toK;

          const isEndpoint = isRangeStart || isRangeEnd;
          const isSelected = isSingleSelected || isEndpoint;
          const isToday = sameDay(cell.date, today) && !cell.outside;
          const isFirstInRow = idx % 7 === 0;
          const isLastInRow = idx % 7 === 6;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(cell.date)}
              className={cn(
                "flex-center h-11 text-sm font-normal transition-colors m-0.5",
                !isInRange && "rounded-md",

                "bg-neutral-100 text-neutral-950",

                cell.outside && "bg-transparent text-neutral-300",

                isToday && "border border-primary-500 bg-transparent",

                isSelected && "bg-primary-500 text-white",

                isFriday(cell.date) &&
                  !isSelected &&
                  "bg-primary-50 text-primary-500",

                isInRange && "bg-primary-50 rounded-none m-0",

                isRangeStart &&
                  cn(
                    "bg-primary-500 text-white",
                    !isLastInRow && "rounded-r-md rounded-l-none m-0",
                    isLastInRow && "rounded-md",
                  ),

                isRangeEnd &&
                  cn(
                    "bg-primary-500 text-white",
                    !isFirstInRow && "rounded-l-md rounded-r-none m-0",
                    isFirstInRow && "rounded-md",
                  ),
              )}>
              {toPersianDigits(cell.date.jd)}
            </button>
          );
        })}
      </div>

      {/* Footer actions */}
      {showFooter && (
        <div
          className={`${mode === "range" ? "justify-between" : "justify-end"} "w-full mt-4 flex items-center gap-3"`}>
          {mode === "range" && (
            <button
              type="button"
              onClick={clearRange}
              className="flex-center gap-1 text-sm text-neutral-800 transition-colors hover:text-foreground">
              <X className="size-4" />
              پاک کردن بازه
            </button>
          )}
          <div className="flex-center gap-x-1.5">
            <Button type="button" variant="link" onClick={handleCancel}>
              انصراف
            </Button>
            <Button type="button" variant={"filled"} onClick={handleConfirm}>
              انتخاب
            </Button>
          </div>
        </div>
      )}
    </div>
  );
  // No trigger: render the calendar inline (always visible), as before.
  if (!trigger) return FHCalender;

  // With a trigger: render inside a popover that toggles open/closed.
  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full md:w-auto h-10 justify-start gap-2 font-normal",
          triggerClassName
        )}>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className="w-auto border-0 p-0" align={align}>
        {FHCalender}
      </PopoverContent>
    </Popover>
  );
}
