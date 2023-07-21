import React, { useContext, useState } from "react";

import { FormDialog } from "../parts/FormDialog";
import { MonthContext } from "@/provider/CalendarProvider";
import { client } from "@/libs/api/axios";

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
    const body = {
      title: title,
      date: daySelected.toISOString(),
      location: location,
      description: description,
    };
    // const body = new URLSearchParams(schedule);
    await client.post("schedule/add-schedule", body);
    client.get("schedule/fetch-schedules").then(({ data }) => {
      setSchedules(data);
    });

    setTitle("");
    setLocation("");
    setDescription("");
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
