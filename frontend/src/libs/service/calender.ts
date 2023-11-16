import dayjs from "dayjs";

export const createCalender = (month = dayjs().month()) => {
  const year = dayjs().year();
  const firstDay = dayjs(new Date(year, month, 1));
  const firstDayIndex = firstDay.day();

  return Array(35)
    .fill(0)
    .map((_, i) => {
      const diffFromFirstDay = i - firstDayIndex;
      const day = firstDay.add(diffFromFirstDay, "day");

      return day;
    });
};

export const isSameDay = (day1: dayjs.Dayjs, day2: dayjs.Dayjs) => {
  const format = "YYYYMMDD";
  return day1.format(format) === day2.format(format);
};

export const isSameMonth = (month1: dayjs.Dayjs, month2: dayjs.Dayjs) => {
  const format = "YYYYMM";
  return month1.format(format) === month2.format(format);
};
