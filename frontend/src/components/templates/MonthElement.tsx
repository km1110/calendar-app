import { Box, Typography } from "@mui/material";

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
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography variant="caption" component="div" sx={{ height: "20%" }}>
        <span>{day.format("D")}</span>
      </Typography>
      <Box sx={{ width: "100%", height: "80%", overflowY: "auto" }}>
        {schedule.map((e: any, index: any) => (
          <Schedule
            key={e.id}
            schedule={e}
            setSchedule={setSchedule}
            setShowDialog={setShowDialog}
          />
        ))}
      </Box>
    </Box>
  );
};
