import dayjs from "dayjs";

export const createCalender = (month = dayjs().month()) => {
  const year = dayjs().year();
  const firstDay = dayjs(new Date(year, month, 1));
  const firstDayIndex = firstDay.day();

  const daysMatrix = new Array(5).fill([]).map((_, i) => {
    return new Array(7).fill(0).map((_, j) => {
      const diffFromFirstDay = i * 7 + j - firstDayIndex;
      const day = firstDay.add(diffFromFirstDay, "day");

      return day;
    });
  });

  return daysMatrix;
};

export const createYearCalender = (year = dayjs().year()) => {
  const firstDay = dayjs(new Date(year, 0, 1));
  const firstDayIndex = firstDay.day();

  const yearMatrix = new Array(53).fill([]).map((_, i) => {
    return new Array(7).fill(0).map((_, j) => {
      const diffFromFirstDay = i * 7 + j - firstDayIndex;
      const day = firstDay.add(diffFromFirstDay, "day");

      return day;
    });
  });

  return yearMatrix;
};

export const getStartAndEndDate = (month: dayjs.Dayjs) => {
  const startDay = month.startOf("month");
  const endDay = month.endOf("month");

  const startDayIndex = startDay.day();
  const endDayIndex = endDay.day();

  const start = startDay.add(-startDayIndex, "day").format("YYYY-MM-DD");
  const end = endDay.add(6 - endDayIndex, "day").format("YYYY-MM-DD");

  return { start, end };
};

export const isSameDay = (day1: dayjs.Dayjs, day2: dayjs.Dayjs) => {
  const format = "YYYYMMDD";
  return day1.format(format) === day2.format(format);
};

export const isSameMonth = (month1: dayjs.Dayjs, month2: dayjs.Dayjs) => {
  const format = "YYYYMM";
  return month1.format(format) === month2.format(format);
};
