import { tagType } from "@/types/tag";
import { atom } from "recoil";

export const tagState = atom<tagType[]>({
  key: "tagState",
  default: [],
});
