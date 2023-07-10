import React from "react";
import dayjs from "dayjs";

type Props = {
  day: any;
};

export const MonthElement: React.FC<Props> = ({ day }) => {
  return (
    <div>
      <header style={{ marginRight: "5px" }}>
        <span>{day.format("D")}</span>
      </header>
    </div>
  );
};
