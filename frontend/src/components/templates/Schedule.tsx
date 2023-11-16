import { Dispatch, SetStateAction } from "react";

import { Card, Typography, styled } from "@mui/material";

import { scheduleType } from "@/types/schedule";

const ScheduleStyle = styled(Card)(({ theme }) => ({
  marginBottom: "4px",
  borderRadius: "5px",
  height: "22px",
  background: "#EEEEEE",
}));

type Props = {
  schedule: scheduleType;
  setSchedule: Dispatch<SetStateAction<scheduleType>>;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
};

export const Schedule = ({ schedule, setSchedule, setShowDialog }: Props) => {
  return (
    <ScheduleStyle>
      <Card
        sx={{ background: "#EEEEEE" }}
        onClick={(e) => {
          e.stopPropagation();
          setShowDialog(true);
          setSchedule(schedule);
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
