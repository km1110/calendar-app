import { type } from "os";
import React from "react";

type Props = {
  schedule: any;
  setSchedule: any;
  setShowDialog: any;
  handleSchedule: any;
};

export const Schedule = ({
  schedule,
  setSchedule,
  setShowDialog,
  handleSchedule,
}: Props) => {
  return (
    <div
      className={`bg-neutral-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
      onClick={(e) => {
        e.stopPropagation();
        setShowDialog(true);
        setSchedule(schedule);
      }}
    >
      {schedule.title}
    </div>
  );
};
