import dayjs from "dayjs";

import { DateType } from "@/types/date";

export const createCalender = (date: DateType) => {
  const firstDay = getMonth(date);
  const firstDayIndex = firstDay.day();

  return Array(42)
    .fill(0)
    .map((_, i) => {
      const diffFromFirstDay = i - firstDayIndex;
      const day = firstDay.add(diffFromFirstDay, "day");

      return day;
    });
};

export const getMonth = (date: DateType) => {
  return dayjs(`${date.year}-${date.month}`);
};

export const isSameDay = (day1: dayjs.Dayjs, day2: dayjs.Dayjs) => {
  const format = "YYYYMMDD";
  return day1.format(format) === day2.format(format);
};

export const isSameMonth = (month1: dayjs.Dayjs, month2: dayjs.Dayjs) => {
  const format = "YYYYMM";
  return month1.format(format) === month2.format(format);
};
