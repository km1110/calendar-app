import dayjs from "dayjs";

export interface todoType {
  id: string;
  name: string;
  tag: string;
  date: dayjs.Dayjs;
  project: string;
  status: boolean;
}
