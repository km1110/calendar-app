import { useEffect, useState } from "react";

import { todoDayCountType } from "@/types/todo";
import { makeInstance } from "@/libs/api/axios";
import dayjs from "dayjs";

export const MainView = () => {
  const [dayCount, setDayCount] = useState<todoDayCountType[]>([]);

  const instance = makeInstance();

  useEffect(() => {
    // 今年と来年の年を取得
    const currentYear = dayjs().year();
    const startYear = currentYear.toString();
    const endYear = (currentYear + 1).toString();

    const fetchData = async () => {
      try {
        const dayCount = await instance.get("/todos/day-count", {
          params: {
            start: startYear,
            end: endYear,
          },
        });
        setDayCount(dayCount.data);
      } catch (error) {
        console.error("An error occurred while fetching the todo:", error);
      }
    };
    fetchData();
  }, []);

  console.log(dayCount);

  return <div>MainView</div>;
};
