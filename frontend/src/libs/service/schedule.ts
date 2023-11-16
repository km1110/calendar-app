import { isSameDay } from "@/libs/service/calender";
import { scheduleType } from "@/types/schedule";
import dayjs from "dayjs";

export const margeSchedules = (
  calendar: dayjs.Dayjs[],
  schedules: scheduleType[]
) => {
  if (schedules === null) {
    schedules = [];
  }
  return calendar.map((cday: dayjs.Dayjs) => ({
    date: cday,
    schedules: schedules.filter((e: scheduleType) =>
      isSameDay(dayjs(e.date), cday)
    ),
  }));
};
