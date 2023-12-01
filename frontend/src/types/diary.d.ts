import dayjs from "dayjs";

export interface diaryType {
  id: string;
  title: string;
  content: string;
  date: dayjs.Dayjs;
}
