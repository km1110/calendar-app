import { todoType } from "@/types/todo";
import dayjs from "dayjs";

export const initialTodos: todoType[] = [
  {
    id: "1",
    name: "Todo Item 1",
    tag: { id: "1", name: "仕事" },
    date: dayjs().add(1, "day"), // 明日の日付
    project: { id: "1", title: "project A" },
    status: false,
  },
  {
    id: "2",
    name: "Todo Item 2",
    tag: { id: "2", name: "個人" },
    date: dayjs().add(2, "day"), // 明後日の日付
    project: { id: "2", title: "project B" },
    status: false,
  },
  {
    id: "3",
    name: "Todo Item 3",
    tag: { id: "3", name: "趣味" },
    date: dayjs().subtract(1, "day"), // 昨日の日付
    project: { id: "3", title: "project C" },
    status: true,
  },
];
