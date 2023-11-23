import { isSameDay } from "@/libs/service/calender";
import { diaryType } from "@/types/diary";
import { scheduleType } from "@/types/schedule";
import dayjs from "dayjs";

export const margeSchedules = (
  calendar: dayjs.Dayjs[],
  schedules: scheduleType[],
  diarys: diaryType[]
) => {
  if (schedules === null) {
    schedules = [];
  }
  return calendar.map((cday: dayjs.Dayjs) => ({
    date: cday,
    schedules: schedules.filter((e: scheduleType) =>
      isSameDay(dayjs(e.date), cday)
    ),
    diary: diarys.find((e: diaryType) => isSameDay(e.date, cday)),
  }));
};
