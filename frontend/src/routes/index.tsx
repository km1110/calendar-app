import React from "react";
import { Routes, Route } from "react-router";

import { MonthPage } from "@/components/pages/MonthPage";
import StartPage from "@/components/pages/StartPage";
import { SignUpPage } from "@/components/pages/SignUpPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUpPage />}></Route>
      <Route path="/start" element={<StartPage />}></Route>
      <Route path="/calendar" element={<MonthPage />}></Route>
    </Routes>
  );
};
