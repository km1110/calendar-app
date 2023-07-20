import React from "react";
import { Routes, Route } from "react-router";

import { MonthPage } from "@/components/pages/MonthPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MonthPage />}></Route>
    </Routes>
  );
};
