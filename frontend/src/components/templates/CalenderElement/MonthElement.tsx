import React from "react";
import dayjs from "dayjs";

import { isSameDay } from "@/libs/service/calender";
import "@/components/templates/CalenderElement/style.css";

type Props = {
  day: any;
};

export const MonthElement = ({ day }: Props) => {
  const today = dayjs();

  const isToday = isSameDay(day, today);

  return (
    <div>
      <header style={{ marginRight: "5px" }}>
        <span className={isToday ? "today" : ""}>{day.format("D")}</span>
      </header>
    </div>
  );
};
