import { scheduleType } from "@/types/schedule";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import React from "react";
import { DaySchedule } from "./DaySchedule";
import dayjs from "dayjs";

type Props = {
  day: dayjs.Dayjs;
  schedules: scheduleType[];
  setSchedule: React.Dispatch<React.SetStateAction<scheduleType>>;
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DailyDialog = ({
  day,
  schedules,
  setSchedule,
  showDialog,
  setShowDialog,
}: Props) => {
  return (
    <Dialog
      open={showDialog}
      onClose={() => setShowDialog(false)}
      // sx={{ width: "100px", height: "100px" }}
    >
      <DialogContent>
        <Typography sx={{ marginBottom: "10px" }}>
          {schedules.length}件の予定があります
        </Typography>
        <Typography>{day.format("DD")}</Typography>
        {schedules.map((schedule: scheduleType, index: number) => (
          <DaySchedule
            key={index}
            schedule={schedule}
            setSchedule={setSchedule}
            setShowDialog={setShowDialog}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setShowDialog(false);
          }}
        >
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};
