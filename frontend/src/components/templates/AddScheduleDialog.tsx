import { useContext } from "react";

import { FormDialog } from "../parts/FormDialog";
import { MonthContext } from "@/provider/CalendarProvider";
import { client } from "@/libs/api/axios";

export const AddScheduleDialog = () => {
  const {
    schedule,
    daySelected,
    showDialog,
    setSchedule,
    setDaySelected,
    setShowDialog,
    setSchedules,
  } = useContext(MonthContext);

  const handleClose = () => {
    setSchedule({
      title: "",
      date: daySelected,
      description: "",
      location: "",
    });
    setShowDialog(false);
  };

  const handleSaveSchedule = async () => {
    const body = {
      title: schedule.title,
      date: daySelected.toISOString(),
      location: schedule.location,
      description: schedule.description,
    };
    await client.post("schedule/add-schedule", body);
    client.get("schedule/fetch-schedules").then(({ data }) => {
      setSchedules(data);
    });

    setSchedule({
      title: "",
      date: daySelected,
      description: "",
      location: "",
    });
    setShowDialog(false);
  };

  return (
    <div>
      <FormDialog
        schedule={schedule}
        date={daySelected}
        setSchdule={setSchedule}
        setDaySelected={setDaySelected}
        showDialog={showDialog}
        handleClose={handleClose}
        handleSaveSchedule={handleSaveSchedule}
      />
    </div>
  );
};
