import { useContext } from "react";

import { ChangeDialog } from "@/components/parts/ChangeDialog";
import { MonthContext } from "@/provider/CalendarProvider";
import { client } from "@/libs/api/axios";
import { scheduleType } from "@/types/schedule";

export const ChangeScheduleDialog = () => {
  const {
    schedule,
    daySelected,
    showChangeDialog,
    setSchedule,
    setSchedules,
    setShowChangeDialog,
  } = useContext(MonthContext);

  const handleClose = () => {
    setSchedule({
      id: "",
      title: "",
      date: daySelected,
      description: "",
      location: "",
    });
    setShowChangeDialog(false);
  };

  const handleChangeSchedule = async (schedule: scheduleType) => {
    const id = schedule.id;
    const title = schedule.title;
    const date = schedule.date;
    const description = schedule.description;
    const location = schedule.location;

    await client.post("schedule/change-schedule", {
      id,
      title,
      date,
      description,
      location,
    });
    client.get("schedule/fetch-schedules").then(({ data }) => {
      setSchedules(data);
    });

    setSchedule({
      id: "",
      title: "",
      date: daySelected,
      description: "",
      location: "",
    });

    setShowChangeDialog(false);
  };

  return (
    <div>
      <ChangeDialog
        schedule={schedule}
        showChangeDialog={showChangeDialog}
        setSchdule={setSchedule}
        handleClose={handleClose}
        handleChangeSchedule={handleChangeSchedule}
      />
    </div>
  );
};
