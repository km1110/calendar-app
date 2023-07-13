import dayjs from "dayjs";

export interface schedule {
  title: string;
  description: string;
  date: dayjs.Dayjs;
  location: string;
}
