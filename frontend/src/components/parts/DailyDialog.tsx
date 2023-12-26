import { scheduleType } from "@/types/schedule";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import React from "react";
import { DaySchedule } from "./DaySchedule";

type Props = {
  schedules: scheduleType[];
  setSchedule: React.Dispatch<React.SetStateAction<scheduleType>>;
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DailyDialog = ({
  schedules,
  setSchedule,
  showDialog,
  setShowDialog,
}: Props) => {
  return (
    <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
      <DialogContent>
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
        <Button onClick={() => setShowDialog(false)}>閉じる</Button>
      </DialogActions>
    </Dialog>
  );
};
