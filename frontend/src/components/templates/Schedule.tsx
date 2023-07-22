import { type } from "os";
import React from "react";

type Props = {
  schedule: any;
  handleChangeSchedule: any;
};

export const Schedule = ({ schedule, handleChangeSchedule }: Props) => {
  return (
    <div
      className={`bg-neutral-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
      onClick={handleChangeSchedule}
    >
      {schedule.title}
    </div>
  );
};
