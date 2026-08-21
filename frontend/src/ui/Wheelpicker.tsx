"use client";

import React, { useState, useEffect } from "react";
import DateObject from "react-date-object";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const months = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
];

// نسخه جایگزین ماه‌ها برای تطبیق بهتر
const monthsAlt = [
  "فروردين", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
];

const getDaysInMonth = (y: number, m: number) =>
  new DateObject({ year: y, month: m, day: 1, calendar: persian }).daysInMonth;

export function WheelPicker({ value, onChange, yearCount = 120 }) {
  const [year, setYear] = useState(value.year);
  const [month, setMonth] = useState(value.month);
  const [day, setDay] = useState(value.day);
  const [days, setDays] = useState<number[]>([]);

  // محاسبه روزهای ماه هر بار که سال یا ماه تغییر کند
  useEffect(() => {
    const daysInMonth = getDaysInMonth(year, month);
    const daysArray = Array.from(
      { length: daysInMonth },
      (_, i) => i + 1
    );
    setDays(daysArray);
    
    // اگر روز فعلی بیشتر از روزهای ماه جدید باشد، به آخرین روز ماه برو
    if (day > daysInMonth) {
      const newDay = daysInMonth;
      setDay(newDay);
      updateDate(year, month, newDay);
    }
  }, [year, month]);

  const years = Array.from({ length: yearCount }, (_, i) => year - yearCount + 1 + i).reverse();

  const updateDate = (y: number, m: number, d: number) => {
    const newDate = new DateObject({
      year: y,
      month: m,
      day: d,
      calendar: persian,
      locale: persian_fa,
    });

    onChange(newDate);
  };

  const handleYearSelect = (y: number) => {
    setYear(y);
    updateDate(y, month, day);
  };

  const handleMonthSelect = (mName: string) => {
    // سعی کن هم با نسخه اصلی و هم با نسخه جایگزین مطابقت بدی
    let monthIndex = months.indexOf(mName);
    if (monthIndex === -1) {
      monthIndex = monthsAlt.indexOf(mName);
    }
    
    const newMonth = monthIndex + 1;
    setMonth(newMonth);
    updateDate(year, newMonth, day);
  };

  const handleDaySelect = (d: number) => {
    setDay(d);
    updateDate(year, month, d);
  };

  // تابع برای پیدا کردن نام ماه فعلی
  const getCurrentMonthName = () => {
    // از ماه‌های اصلاح شده استفاده کن
    return monthsAlt[month - 1] || months[month - 1];
  };

  return (
    <div className="flex gap-4 justify-center py-4">
      {/* Year */}
      <WheelColumn
        items={years}
        value={year}
        onSelect={handleYearSelect}
      />

      {/* Month */}
      <WheelColumn
        items={monthsAlt} // استفاده از نسخه جایگزین ماه‌ها
        value={getCurrentMonthName()}
        onSelect={handleMonthSelect}
      />

      {/* Day */}
      <WheelColumn
        items={days}
        value={day}
        onSelect={handleDaySelect}
      />
    </div>
  );
}

function WheelColumn({ items, value, onSelect }: { 
  items: (string | number)[]; 
  value: string | number; 
  onSelect: (item: string | number) => void;
}) {
  return (
    <div className="h-40 overflow-y-auto snap-y snap-mandatory w-20 text-center border rounded-lg scrollbar-hide">
      {items.map((item) => (
        <div
          key={item}
          onClick={() => onSelect(item)}
          className={`py-2 cursor-pointer snap-center transition-all duration-200 ${
            item.toString() === value.toString() 
              ? "text-blue-600 font-bold bg-blue-50 scale-105" 
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}