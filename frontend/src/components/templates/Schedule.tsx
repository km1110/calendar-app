import { Dispatch, SetStateAction } from "react";

import { Paper, Typography, styled } from "@mui/material";

import { scheduleType } from "@/types/schedule";

const ScheduleStyle = styled(Paper)(({ theme }) => ({
  marginBottom: "4px",
  borderRadius: "5px",
  border: "1px solid #EEEEEE",
  height: "20px",
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
        sx={{ background: "#EEEEEE" }}
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
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {schedule.title}
        </Typography>
      </Paper>
    </ScheduleStyle>
  );
};
