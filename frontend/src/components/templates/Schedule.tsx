import { Dispatch, SetStateAction } from "react";

import { scheduleType } from "@/types/schedule";

type Props = {
  schedule: scheduleType;
  setSchedule: Dispatch<SetStateAction<scheduleType>>;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
};

export const Schedule = ({ schedule, setSchedule, setShowDialog }: Props) => {
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
