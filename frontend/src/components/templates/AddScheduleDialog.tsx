import React, { useContext, useState } from "react";

import { FormDialog } from "../parts/FormDialog";
import { MonthContext } from "@/provider/CalendarProvider";
import { client } from "@/libs/api/axios";
import { scheduleType } from "@/types/schedule";

export const AddScheduleDialog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const {
    daySelected,
    showDialog,
    setDaySelected,
    setShowDialog,
    setSchedules,
  } = useContext(MonthContext);

  const handleClose = () => {
    setTitle("");
    setLocation("");
    setDescription("");
    setShowDialog(false);
  };

  const handleSaveSchedule = async () => {
    const schedule = {
      title: title,
      date: daySelected.format("YYYYMMDD"),
      location: location,
      description: description,
    };
    const body = new URLSearchParams(schedule);
    await client.post("add-schedule", body);
    client.get("fetch-schedule").then(({ data }) => {
      setSchedules(data);
    });

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
