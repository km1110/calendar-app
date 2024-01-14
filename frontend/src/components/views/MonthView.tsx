import { useContext, useEffect } from "react";

import { Box } from "@mui/material";
import { useRecoilState } from "recoil";

import { MonthCalender } from "@/components/templates/MonthCalender";
import { AddScheduleDialog } from "@/components/templates/AddScheduleDialog";
import { CurrentScheduleDialog } from "@/components/templates/CurrentScheduleDialog";
import { AddScheduleBar } from "@/components/templates/AddScheduleBar";
import { ChangeScheduleDialog } from "@/components/templates/ChangeScheduleDialog";
import { MonthContext } from "@/provider/CalendarProvider";
import { makeInstance } from "@/libs/api/axios";
import { getStartAndEndDate } from "@/libs/service/calender";
import { scheduleType } from "@/types/schedule";
import { diaryType } from "@/types/diary";
import { diarysState } from "@/atoms/diarysState";
import { pageState } from "@/atoms/pageState";

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
            start_date: start,
            end_date: end,
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
