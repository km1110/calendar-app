import { useContext } from "react";

import { CurrentDialog } from "@/components/parts/CurrentDialog";
import { MonthContext } from "@/provider/CalendarProvider";
import { client } from "@/libs/api/axios";

export const CurrentScheduleDialog = () => {
  const {
    daySelected,
    schedule,
    showDialog,
    setShowDialog,
    setShowChangeDialog,
    setSchedule,
    setSchedules,
  } = useContext(MonthContext);

  const handleDelete = async (id: string) => {
    await client.post("schedule/delete-schedule", { id });
    client.get("schedule/fetch-schedules").then(({ data }) => {
      setSchedules(data);
    });
    setShowDialog(false);
  };

  const handleClose = () => {
    setSchedule({
      id: "",
      title: "",
      date: daySelected,
      description: "",
      location: "",
    });
    setShowDialog(false);
  };

  return (
    <div>
      <CurrentDialog
        schedule={schedule}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        setShowChangeDialog={setShowChangeDialog}
        handleDelete={handleDelete}
        handleClose={handleClose}
      />
    </div>
  );
};
