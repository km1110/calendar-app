import { Typography } from "@mui/material";

import { Schedule } from "@/components/templates/Schedule";

import { useContext } from "react";
import { MonthContext } from "@/provider/CalendarProvider";

type Props = {
  day: any;
  schedule: any;
};

export const MonthElement = ({ day, schedule }: Props) => {
  const { setShowDialog, setSchedule } = useContext(MonthContext);

  return (
    <div>
      <Typography variant="caption" component="div">
        <span>{day.format("D")}</span>
      </Typography>
      <div className="overflow-y-scroll">
        {schedule.map((e: any, index: any) => (
          <Schedule
            key={e.id}
            schedule={e}
            setSchedule={setSchedule}
            setShowDialog={setShowDialog}
          />
        ))}
      </div>
    </div>
  );
};
