import { scheduleType } from "@/types/schedule";
import styled from "@emotion/styled";
import { Card, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  schedule: scheduleType;
  setSchedule: Dispatch<SetStateAction<scheduleType>>;
  setDailyDialog: Dispatch<SetStateAction<boolean>>;
  setScheduleDialog: Dispatch<SetStateAction<boolean>>;
};

const ScheduleStyle = styled(Card)(({ theme }) => ({
  marginBottom: "4px",
  borderRadius: "5px",
  height: "22px",
  background: "#EEEEEE",
}));

export const DaySchedule = ({
  schedule,
  setSchedule,
  setDailyDialog,
  setScheduleDialog,
}: Props) => {
  return (
    <ScheduleStyle>
      <Card
        sx={{ background: "#EEEEEE", height: "30px" }}
        onClick={(e) => {
          e.stopPropagation();
          setScheduleDialog(true);
          setSchedule(schedule);
          setDailyDialog(false);
        }}
      >
        <Typography
          fontStyle={""}
          sx={{
            fontWeight: 400,
            textAlign: "left",
            marginLeft: "10px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {schedule.title}
        </Typography>
      </Card>
    </ScheduleStyle>
  );
};
