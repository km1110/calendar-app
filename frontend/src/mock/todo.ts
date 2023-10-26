import { todoType } from "@/types/todo";
import dayjs from "dayjs";

export const initialTodos: todoType[] = [
  {
    id: "1",
    name: "Todo Item 1",
    tag: "hobby",
    date: dayjs().add(1, "day"), // 明日の日付
    project: "Project A",
    status: false,
  },
  {
    id: "2",
    name: "Todo Item 2",
    tag: "job",
    date: dayjs().add(2, "day"), // 明後日の日付
    project: "Project B",
    status: false,
  },
  {
    id: "3",
    name: "Todo Item 3",
    tag: "schoole",
    date: dayjs().subtract(1, "day"), // 昨日の日付
    project: "Project C",
    status: true,
  },
  {
    id: "4",
    name: "Todo Item 4",
    tag: "schoole",
    date: dayjs().subtract(1, "day"), // 昨日の日付
    project: "Project C",
    status: true,
  },
  {
    id: "5",
    name: "Todo Item 5",
    tag: "schoole",
    date: dayjs().subtract(1, "day"), // 昨日の日付
    project: "Project C",
    status: true,
  },
  {
    id: "6",
    name: "Todo Item 6",
    tag: "schoole",
    date: dayjs().subtract(1, "day"), // 昨日の日付
    project: "Project C",
    status: true,
  },
  {
    id: "7",
    name: "Todo Item 7",
    tag: "schoole",
    date: dayjs().subtract(1, "day"), // 昨日の日付
    project: "Project C",
    status: true,
  },
  {
    id: "8",
    name: "Todo Item 8",
    tag: "schoole",
    date: dayjs().subtract(1, "day"), // 昨日の日付
    project: "Project C",
    status: true,
  },
  {
    id: "9",
    name: "Todo Item 9",
    tag: "schoole",
    date: dayjs().subtract(1, "day"), // 昨日の日付
    project: "Project C",
    status: true,
  },
  {
    id: "10",
    name: "Todo Item 10",
    tag: "schoole",
    date: dayjs().subtract(1, "day"), // 昨日の日付
    project: "Project C",
    status: true,
  },
  {
    id: "11",
    name: "Todo Item 11",
    tag: "schoole",
    date: dayjs().subtract(1, "day"), // 昨日の日付
    project: "Project C",
    status: true,
  },
  {
    id: "12",
    name: "Todo Item 12",
    tag: "schoole",
    date: dayjs().subtract(1, "day"), // 昨日の日付
    project: "Project C",
    status: true,
  },
  {
    id: "13",
    name: "Todo Item 13",
    tag: "schoole",
    date: dayjs().subtract(1, "day"), // 昨日の日付
    project: "Project C",
    status: true,
  },
  {
    id: "14",
    name: "Todo Item 11",
    tag: "schoole",
    date: dayjs().subtract(1, "day"), // 昨日の日付
    project: "Project C",
    status: true,
  },
  {
    id: "15",
    name: "Todo Item 12",
    tag: "schoole",
    date: dayjs().subtract(1, "day"), // 昨日の日付
    project: "Project C",
    status: false,
  },
  {
    id: "16",
    name: "Todo Item 13",
    tag: "schoole",
    date: dayjs().subtract(1, "day"), // 昨日の日付
    project: "Project C",
    status: false,
  },
];
