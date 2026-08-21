"use client";

import * as React from "react";

import jalaali from "jalaali-js";

import { CalendarIcon } from "lucide-react";

import { cn } from "@/core/utils/shadcn.utils";
import { formatDisplayDate } from "@/core/utils/persian-date.utils";

import { Button } from "@/shared/ui/button";
import { Calendar, type JalaliDate } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

function toJalali(date: Date): JalaliDate {
  const greg = { gy: date.getFullYear(), gm: date.getMonth() + 1, gd: date.getDate() };
  return jalaali.toJalaali(greg.gy, greg.gm, greg.gd);
}

function toDate(jalali: JalaliDate): Date {
  const greg = jalaali.toGregorian(jalali.jy, jalali.jm, jalali.jd);
  return new Date(greg.gy, greg.gm - 1, greg.gd);
}

interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

function DatePicker({
  value,
  defaultValue,
  onChange,
  placeholder = "تاریخ",
  className,
  disabled,
}: DatePickerProps) {
  const isControlled = value !== undefined;
  const [uncontrolledDate, setUncontrolledDate] = React.useState<Date | undefined>(defaultValue);
  const selectedDate = isControlled ? value : uncontrolledDate;

  const setSelectedDate = (date: Date | undefined) => {
    setUncontrolledDate(date);
    onChange?.(date);
  };

  const [open, setOpen] = React.useState(false);
  const [draftValue, setDraftValue] = React.useState<JalaliDate | undefined>(
    selectedDate ? toJalali(selectedDate) : undefined,
  );

  const handleConfirm = (val: JalaliDate) => {
    setSelectedDate(toDate(val));
    setOpen(false);
  };

  const handleCancel = () => {
    setDraftValue(undefined);
    setSelectedDate(undefined);
    setOpen(false);
  };

  const displayText = React.useMemo(() => {
    if (!selectedDate) return placeholder;
    return formatDisplayDate(selectedDate);
  }, [selectedDate, placeholder]);

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) {
          setDraftValue(selectedDate ? toJalali(selectedDate) : undefined);
        }
        setOpen(nextOpen);
      }}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn("text-neutral-500 placeholder:text-neutral-400 flex-between", className)}
          leftIcon={<CalendarDaysIcon className="size-4.5 text-neutral-500 shrink-0" />}>
          <span>{displayText}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={8}
        align="start"
        className="w-auto overflow-hidden p-0">
        <div className="flex flex-col">
          <Calendar
            mode="single"
            value={draftValue}
            onChange={setDraftValue}
            showFooter={false}
            className="rounded-none"
          />

          <div className="flex bg-white justify-end gap-2 p-4">
            <Button size="sm" variant="link" onClick={handleCancel}>
              انصراف
            </Button>
            <Button size="sm" onClick={() => draftValue && handleConfirm(draftValue)}>
              انتخاب
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

DatePicker.displayName = "DatePicker";

export { DatePicker };
