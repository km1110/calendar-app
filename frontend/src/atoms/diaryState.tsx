import { atom } from "recoil";
import { diaryType } from "@/types/diary";
import dayjs from "dayjs";

export const diaryState = atom<diaryType>({
  key: "diaryState",
  default: {
    id: "",
    title: "",
    content: "",
    date: dayjs(),
  },
});
