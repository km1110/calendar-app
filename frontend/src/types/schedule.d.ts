import dayjs from "dayjs";

export interface scheduleType {
  id: string;
  title: string;
  description: string;
  date: dayjs.Dayjs;
  location: string;
}
