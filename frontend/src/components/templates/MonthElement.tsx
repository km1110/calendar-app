import { Typography } from "@mui/material";

// import dayjs from "dayjs";

import { Schedule } from "@/components/templates/Schedule";
// import { isSameDay } from "@/libs/service/calender";
import { useContext } from "react";
import { MonthContext } from "@/provider/CalendarProvider";
import { scheduleType } from "@/types/schedule";

type Props = {
  day: any;
  schedule: any;
};

export const MonthElement = ({ day, schedule }: Props) => {
  const { setShowDialog, setSchedule } = useContext(MonthContext);

  // const today = dayjs();
  // const isToday = isSameDay(day, today);

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
