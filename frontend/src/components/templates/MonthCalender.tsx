import React, { useState } from "react";
import dayjs from "dayjs";

import { MonthElement } from "@/components/parts/CalenderElement/MonthElement";
import { createCalender } from "@/libs/service/calender";

export const MonthCalender = () => {
  const currenDate = dayjs();
  const year = currenDate.year();
  const month = currenDate.month() + 1;

  const [currentMonth, setCurrentMonth] = useState(
    createCalender({ year, month })
  );

  return (
    <div>
      {currentMonth.map((days: any, i: number) => (
        <MonthElement key={i} day={days} />
      ))}
    </div>
  );
};
