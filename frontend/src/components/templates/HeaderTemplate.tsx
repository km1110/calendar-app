import React, { useContext } from "react";
import dayjs from "dayjs";

import { Header } from "@/components/parts/Header";
import { MonthContext } from "@/provider/CalendarProvider";

export const HeaderTemplate = () => {
  const { month, setMonth } = useContext(MonthContext);

  const handlePrevioustMonth = () => {
    setMonth(month - 1);
  };

  const handleNextMonth = () => {
    setMonth(month + 1);
  };

  const year = dayjs().year();
  const date = dayjs(new Date(year, month));

  return (
    <Header
      date={date}
      setPrevioustMonth={handlePrevioustMonth}
      setNextMonth={handleNextMonth}
    />
  );
};
