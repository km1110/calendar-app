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

  const schedule = {
    title: title,
    date: daySelected,
    location: location,
    description: description,
  };

  const handleClose = () => {
    setTitle("");
    setLocation("");
    setDescription("");
    setShowDialog(false);
  };

  const handleSaveSchedule = () => {
    setShowDialog(false);
    setTitle("");
    setLocation("");
    setDescription("");
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
