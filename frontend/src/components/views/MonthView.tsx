import { useContext, useEffect } from "react";

import { HeaderTemplate } from "@/components/templates/HeaderTemplate";
import { MonthCalender } from "@/components/templates/MonthCalender";
import { AddScheduleDialog } from "@/components/templates/AddScheduleDialog";
import { CurrentScheduleDialog } from "@/components/templates/CurrentScheduleDialog";
import { ChangeScheduleDialog } from "../templates/ChangeScheduleDialog";
import { MonthContext } from "@/provider/CalendarProvider";
import { client } from "@/libs/api/axios";

export const MonthView = () => {
  const { setSchedules } = useContext(MonthContext);

  useEffect(() => {
    const getSchedules = async () => {
      client.get("schedule/").then(({ data }) => {
        setSchedules(data);
      });
    };
    getSchedules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <HeaderTemplate />
      <MonthCalender />
      <AddScheduleDialog />
      <CurrentScheduleDialog />
      <ChangeScheduleDialog />
    </div>
  );
};
