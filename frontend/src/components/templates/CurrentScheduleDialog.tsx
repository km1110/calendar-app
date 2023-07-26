import React, { useContext } from "react";

import { CurrentDialog } from "@/components/parts/CurrentDialog";
import { MonthContext } from "@/provider/CalendarProvider";
import { client } from "@/libs/api/axios";
import { setSchedules } from "@/libs/service/schedule";

export const CurrentScheduleDialog = () => {
  const { schedule, showDialog, setShowDialog, setSchedules } =
    useContext(MonthContext);

  const handleChange = (e: any) => {
    // 他のイベントが発火するのをキャンセル
    e.stopPropagation();
  };

  const handleDelete = async (id: string) => {
    await client.post("schedule/delete-schedule", { id });
    client.get("schdule/fetch-schedules").then(({ data }) => {
      setSchedules(data);
    });
    setShowDialog(false);
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  return (
    <div>
      <CurrentDialog
        schedule={schedule}
        showDialog={showDialog}
        handleChange={handleChange}
        handleDelete={handleDelete}
        handleClose={handleClose}
      />
    </div>
  );
};
