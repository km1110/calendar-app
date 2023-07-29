import { useContext } from "react";

import { FormDialog } from "../parts/FormDialog";
import { MonthContext } from "@/provider/CalendarProvider";
import { client } from "@/libs/api/axios";

export const AddScheduleDialog = () => {
  const {
    schedule,
    daySelected,
    showAddDialog,
    setSchedule,
    setDaySelected,
    setShowAddDialog,
    setSchedules,
  } = useContext(MonthContext);

  const handleClose = () => {
    setSchedule({
      id: "",
      title: "",
      date: daySelected,
      description: "",
      location: "",
    });
    setShowAddDialog(false);
  };

  // TODO viewsに移動
  const handleSaveSchedule = async () => {
    const body = {
      title: schedule.title,
      date: daySelected.toISOString(),
      location: schedule.location,
      description: schedule.description,
    };
    await client.post("schedule/", body);
    client.get("schedule/").then(({ data }) => {
      setSchedules(data);
    });

    setSchedule({
      id: "",
      title: "",
      date: daySelected,
      description: "",
      location: "",
    });
    setShowAddDialog(false);
  };

  return (
    <div>
      <FormDialog
        schedule={schedule}
        date={daySelected}
        setSchdule={setSchedule}
        setDaySelected={setDaySelected}
        showAddDialog={showAddDialog}
        handleClose={handleClose}
        handleSaveSchedule={handleSaveSchedule}
      />
    </div>
  );
};
