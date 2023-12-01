import { useEffect, useState } from "react";

import { todoDayRatioType } from "@/types/todo";
import { makeInstance } from "@/libs/api/axios";
import dayjs from "dayjs";
import { Contribution } from "../templates/Contribution";
import { useRecoilState } from "recoil";
import { pageState } from "@/atoms/pageState";
import { set } from "date-fns";

export const MainView = () => {
  const [dayRatio, setDayRatio] = useState<todoDayRatioType[]>([]);
  const [page, setPage] = useRecoilState<string>(pageState);

  const instance = makeInstance();

  useEffect(() => {
    setPage("main");
    // 今年と来年の年を取得
    const currentYear = dayjs().year();
    const startYear = currentYear.toString();
    const endYear = (currentYear + 1).toString();

    const fetchData = async () => {
      try {
        const dayRatio = await instance.get("/todos/day-count", {
          params: {
            start: startYear,
            end: endYear,
          },
        });
        setDayRatio(dayRatio.data);
      } catch (error) {
        console.error("An error occurred while fetching the todo:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Contribution dayRatio={dayRatio} />
    </div>
  );
};
