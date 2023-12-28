import { isSameDay } from "@/libs/service/calender";
import { diaryType } from "@/types/diary";
import { scheduleType } from "@/types/schedule";
import dayjs from "dayjs";

export const margeSchedules = (
  calendar: dayjs.Dayjs[][],
  schedules: scheduleType[],
  diarys: diaryType[]
) => {
  if (schedules === null) {
    schedules = [];
  }
  if (diarys === null) {
    diarys = [];
  }

  return calendar.map((cal: dayjs.Dayjs[]) => {
    return cal.map((cday: dayjs.Dayjs) => {
      return {
        date: cday,
        schedules: schedules.filter((e: scheduleType) =>
          isSameDay(dayjs(e.date), cday)
        ),
        diary: diarys.find((e: diaryType) => isSameDay(dayjs(e.date), cday)),
      };
    });
  });
};
