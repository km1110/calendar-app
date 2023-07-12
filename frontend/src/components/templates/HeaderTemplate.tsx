import React, { useContext } from "react";

import { Header } from "@/components/parts/Header";
import { MonthContext } from "@/provider/CalendarProvider";

export const HeaderTemplate = () => {
  const { date, setDate } = useContext(MonthContext);
  const previousMonth = { year: date.year, month: date.month - 1 };
  const nextMonth = { year: date.year, month: date.month + 1 };

  const handlePrevioustMonth = () => {
    setDate(previousMonth);
  };
  const handleNextMonth = () => {
    setDate(nextMonth);
  };

  return (
    <Header
      setPrevioustMonth={handlePrevioustMonth}
      setNextMonth={handleNextMonth}
    />
  );
};
