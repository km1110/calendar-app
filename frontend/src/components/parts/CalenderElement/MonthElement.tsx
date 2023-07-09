import dayjs from "dayjs";
import React from "react";

export const MonthElement = (props: any) => {
  const { day, index } = props;

  const today = dayjs();

  return (
    <div>
      <header>
        <span>{day.format("D")}</span>
      </header>
    </div>
  );
};
