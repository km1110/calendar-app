import { useContext, useEffect, useState } from "react";

import { MonthCalender } from "@/components/templates/MonthCalender";
import { AddScheduleDialog } from "@/components/templates/AddScheduleDialog";
import { CurrentScheduleDialog } from "@/components/templates/CurrentScheduleDialog";
import { ChangeScheduleDialog } from "../templates/ChangeScheduleDialog";
import { MonthContext } from "@/provider/CalendarProvider";
import { makeInstance } from "@/libs/api/axios";
import { scheduleType } from "@/types/schedule";
import { getStartAndEndDate } from "@/libs/service/calender";
import { diaryType } from "@/types/diary";
import { useRecoilState } from "recoil";
import { diarysState } from "@/atoms/diarysState";
import { pageState } from "@/atoms/pageState";
import { Box } from "@mui/material";
import { AddScheduleBar } from "../templates/AddScheduleBar";

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

  const [diarys, setDiarys] = useRecoilState<diaryType[]>(diarysState);
  const [page, setPage] = useRecoilState<string>(pageState);

  const instance = makeInstance();

  useEffect(() => {
    setPage("calendar");
    const { start, end } = getStartAndEndDate(daySelected);
    const fetchData = async () => {
      try {
        const schedules = await instance.get("/schedule", {
          params: {
            start: start,
            end: end,
          },
        });
        const diarys = await instance.get("/diarys", {
          params: {
            start: start,
            end: end,
          },
        });
        setSchedules(schedules.data);
        setDiarys(diarys.data);
      } catch (error) {
        console.error("An error occurred while fetching the schedules:", error);
      }
    };
    fetchData();
  }, []);

  // scheduleに関する処理
  const handleSaveSchedule = async () => {
    const body = {
      title: schedule.title,
      date: daySelected.toISOString(),
      location: schedule.location,
      description: schedule.description,
    };

    const { start, end } = getStartAndEndDate(daySelected);

    await instance.post("/schedule", body);
    instance
      .get("/schedule", {
        params: {
          start: start,
          end: end,
        },
      })
      .then(({ data }) => {
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

    const { start, end } = getStartAndEndDate(daySelected);

    await instance.put(`/schedule/${id}`, {
      title,
      date,
      description,
      location,
    });
    instance
      .get("/schedule", {
        params: {
          start: start,
          end: end,
        },
      })
      .then(({ data }) => {
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
    const { start, end } = getStartAndEndDate(daySelected);

    await instance.delete(`/schedule/${id}`);
    instance
      .get("/schedule", {
        params: {
          start: start,
          end: end,
        },
      })
      .then(({ data }) => {
        setSchedules(data);
      });

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
      <Box display="flex" flexDirection="row">
        <AddScheduleBar handleSaveSchedule={handleSaveSchedule} />
        <MonthCalender diarys={diarys} />
      </Box>
      <AddScheduleDialog handleSaveSchedule={handleSaveSchedule} />
      <CurrentScheduleDialog handleDelete={handleDelete} />
      <ChangeScheduleDialog handleChangeSchedule={handleChangeSchedule} />
    </div>
  );
};
