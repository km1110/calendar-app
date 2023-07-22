import { isSameDay } from "@/libs/service/calender";
import dayjs from "dayjs";

export const setSchedules = (calendar: any, schedules: any) => {
  return calendar.map((c: any) => ({
    date: c,
    schedules: schedules.filter((e: any) => isSameDay(dayjs(e.date), c)),
  }));
};
