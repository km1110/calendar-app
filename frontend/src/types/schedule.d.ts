import dayjs from "dayjs";

export interface scheduleType {
  title: string;
  description: string;
  date: dayjs.Dayjs;
  location: string;
}
