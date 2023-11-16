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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "20%",
        }}
      >
        <Typography variant="caption" sx={{ marginRight: "7px" }}>
          {day.format("D")}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", height: "80%", overflowY: "auto" }}>
        {schedule.map((e: any, index: number) => (
          <Schedule
            key={index}
            schedule={e}
            setSchedule={setSchedule}
            setShowDialog={setShowDialog}
          />
        ))}
      </Box>
    </Box>
  );
};
