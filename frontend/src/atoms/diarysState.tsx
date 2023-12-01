import { diaryType } from "@/types/diary";
import { atom } from "recoil";

export const diarysState = atom<diaryType[]>({
  key: "diarysState",
  default: [],
});
