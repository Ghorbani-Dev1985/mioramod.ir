'use client'

import { WheelPicker } from "@/ui";
import { useState } from "react";
import DateObject from "react-date-object";

import persian from "react-date-object/calendars/persian";


export default function Home() {
    const [date, setDate] = useState(
    new DateObject({
      year: 1404,
      month: 1,
      day: 1,
      calendar: persian,
    })
  );

  return (
     <div className="flex flex-col max-w-md p-5 gap-y-10 mt-10">
<WheelPicker value={date} onChange={setDate} />

      <div className="mt-4">
        تاریخ انتخاب‌شده:  
        <strong>{date.format("YYYY/MM/DD")}</strong>
      </div>


</div>
    
  );
}
