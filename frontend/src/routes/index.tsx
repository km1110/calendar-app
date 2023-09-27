import React from "react";
import { Routes, Route } from "react-router";

import { MonthPage } from "@/components/pages/MonthPage";
import StartPage from "@/components/pages/StartPage";
import { SignUpPage } from "@/components/pages/SignUpPage";
import { SignInPage } from "@/components/pages/SignInPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUpPage />}></Route>
      <Route path="/signin" element={<SignInPage />}></Route>
      <Route path="/start" element={<StartPage />}></Route>
      <Route path="/calendar" element={<MonthPage />}></Route>
    </Routes>
  );
};
