import { isSameDay } from "@/libs/service/calender";

export const setSchedules = (calendar: any, schedules: any) =>
  calendar.map((c: any) => ({
    date: c,
    schedules: schedules.fillter((e: any) => isSameDay(e.date, c)),
  }));
