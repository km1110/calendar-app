import React, { useContext } from "react";

import { ChangeDialog } from "@/components/parts/ChangeDialog";
import { MonthContext } from "@/provider/CalendarProvider";

export const ChangeScheduleDialog = () => {
  const {
    schedule,
    daySelected,
    showChangeDialog,
    setSchedule,
    setDaySelected,
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

  const handleSaveSchedule = () => {
    console.log(schedule);
    setShowChangeDialog(false);
  };

  return (
    <div>
      <ChangeDialog
        schedule={schedule}
        date={daySelected}
        showChangeDialog={showChangeDialog}
        setSchdule={setSchedule}
        handleClose={handleClose}
        handleSaveSchedule={handleSaveSchedule}
      />
    </div>
  );
};
