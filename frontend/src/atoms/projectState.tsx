import { projectsType } from "@/types/project";
import { atom } from "recoil";

export const projectState = atom<projectsType[]>({
  key: "projectState",
  default: [],
});
