import React from "react";
import { Dispatch, SetStateAction } from "react";
import Paper from "@mui/material/Paper";
import { Typography, styled } from "@mui/material";

import { scheduleType } from "@/types/schedule";

const ScheduleStyle = styled(Paper)(({ theme }) => ({
  marginBottom: "4px",
  border: "1px solid #e0e0e0",
  height: "20px",
  background: "#e0e0e0",
}));

type Props = {
  schedule: scheduleType;
  setSchedule: Dispatch<SetStateAction<scheduleType>>;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
};

export const Schedule = ({ schedule, setSchedule, setShowDialog }: Props) => {
  return (
    <ScheduleStyle>
      <Paper
        elevation={0}
        sx={{ background: "#e0e0e0" }}
        onClick={(e) => {
          e.stopPropagation();
          setShowDialog(true);
          setSchedule(schedule);
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            textAlign: "left",
            marginLeft: "10px",
          }}
        >
          {schedule.title}
        </Typography>
      </Paper>
    </ScheduleStyle>
  );
};
