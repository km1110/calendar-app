import React from "react";
import dayjs from "dayjs";

type Props = {
  day: any;
};

export const MonthElement = ({ day }: Props) => {
  return (
    <div>
      <header style={{ marginRight: "5px" }}>
        <span>{day.format("D")}</span>
      </header>
    </div>
  );
};
