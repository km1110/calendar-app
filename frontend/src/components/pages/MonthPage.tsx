import React from "react";

import { Header } from "../parts/Header";
import { MonthCalender } from "@/components/templates/MonthCalender";

export const MonthPage = () => {
  return (
    <div>
      <Header />
      <MonthCalender />
    </div>
  );
};
