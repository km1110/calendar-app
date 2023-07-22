import dayjs from "dayjs";

import { Schedule } from "@/components/templates/Schedule";
import { isSameDay } from "@/libs/service/calender";

type Props = {
  day: any;
  schedule: any;
};

export const MonthElement = ({ day, schedule }: Props) => {
  const today = dayjs();
  const isToday = isSameDay(day, today);

  const handleChangeSchedule = () => {
    console.log("TEST");
  };

  return (
    <div>
      <header style={{ marginRight: "5px" }}>
        <span>{day.format("D")}</span>
      </header>
      <div>
        {schedule.map((e: any) => (
          <Schedule
            key={e.id}
            schedule={e}
            handleChangeSchedule={handleChangeSchedule}
          />
        ))}
      </div>
    </div>
  );
};
