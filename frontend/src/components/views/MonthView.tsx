import { useContext, useEffect } from "react";

import { HeaderTemplate } from "@/components/templates/HeaderTemplate";
import { MonthCalender } from "@/components/templates/MonthCalender";
import { AddScheduleDialog } from "@/components/templates/AddScheduleDialog";
import { CurrentScheduleDialog } from "@/components/templates/CurrentScheduleDialog";
import { ChangeScheduleDialog } from "../templates/ChangeScheduleDialog";
import { MonthContext } from "@/provider/CalendarProvider";
import { client } from "@/libs/api/axios";
import { scheduleType } from "@/types/schedule";

export const MonthView = () => {
  const {
    schedule,
    daySelected,
    setSchedule,
    setSchedules,
    setShowAddDialog,
    setShowChangeDialog,
    setShowDialog,
  } = useContext(MonthContext);

  useEffect(() => {
    const getSchedules = async () => {
      client.get("schedule/").then(({ data }) => {
        setSchedules(data);
      });
    };
    getSchedules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleChangeSchedule = async (schedule: scheduleType) => {
    const id = schedule.id;
    const title = schedule.title;
    const date = schedule.date;
    const description = schedule.description;
    const location = schedule.location;

    await client.put("schedule/", {
      id,
      title,
      date,
      description,
      location,
    });
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

    setShowChangeDialog(false);
  };

  const handleDelete = async (id: string) => {
    await client.delete("schedule/", { params: { id } });
    client.get("schedule/").then(({ data }) => {
      setSchedules(data);
    });
    setShowDialog(false);
  };

  return (
    <div>
      <HeaderTemplate />
      <MonthCalender />
      <AddScheduleDialog handleSaveSchedule={handleSaveSchedule} />
      <CurrentScheduleDialog handleDelete={handleDelete} />
      <ChangeScheduleDialog handleChangeSchedule={handleChangeSchedule} />
    </div>
  );
};
