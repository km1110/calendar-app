import { type } from "os";
import React from "react";

type Props = {
  schedule: any;
  handleChangeSchedule: any;
};

export const Schedule = ({ schedule, handleChangeSchedule }: Props) => {
  return <div onClick={handleChangeSchedule}>{schedule.title}</div>;
};
