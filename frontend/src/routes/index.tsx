import React from "react";
import { Routes, Route } from "react-router";

import { TopPage } from "@/components/pages/TopPage";
import { SignUpPage } from "@/components/pages/SignUpPage";
import { SignInPage } from "@/components/pages/SignInPage";
import { SendEmailPage } from "@/components/pages/SendEmailPage";
import { ResetPage } from "@/components/pages/ResetPage";
import { MainPage } from "@/components/pages/MainPage";
import { MonthPage } from "@/components/pages/MonthPage";
import { TodoListPage } from "@/components/pages/TodoListPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<TopPage />}></Route>
      <Route path="/signup" element={<SignUpPage />}></Route>
      <Route path="/signin" element={<SignInPage />}></Route>
      <Route path="/sendemail" element={<SendEmailPage />}></Route>
      <Route path="/reset" element={<ResetPage />}></Route>
      <Route path="/main" element={<MainPage />}></Route>
      <Route path="/calendar" element={<MonthPage />}></Route>
      <Route path="/todolist" element={<TodoListPage />}></Route>
    </Routes>
  );
};
