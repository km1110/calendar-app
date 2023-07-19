import React, { useContext, useState } from "react";
import { FormDialog } from "../parts/FormDialog";
import { MonthContext } from "@/provider/CalendarProvider";
import { scheduleType } from "@/types/schedule";

export const AddScheduleDialog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const { daySelected, showDialog, setDaySelected, setShowDialog } =
    useContext(MonthContext);

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.target.value);
  };

  const handleSaveSchedule = () => {
    // console.log(setSchedules);
    setShowDialog(false);
  };

  return (
    <div>
      <FormDialog
        title={title}
        description={description}
        location={location}
        date={daySelected}
        setTitle={setTitle}
        setDescription={setDescription}
        setLocation={setLocation}
        setDaySelected={setDaySelected}
        showDialog={showDialog}
        handleClose={handleClose}
        handleSaveSchedule={handleSaveSchedule}
      />
    </div>
  );
};
