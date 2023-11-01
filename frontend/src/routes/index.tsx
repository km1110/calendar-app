import React from "react";
import { Routes, Route } from "react-router";

import { MonthPage } from "@/components/pages/MonthPage";
import { SignUpPage } from "@/components/pages/SignUpPage";
import { SignInPage } from "@/components/pages/SignInPage";
import { TodoListPage } from "@/components/pages/TodoListPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUpPage />}></Route>
      <Route path="/signin" element={<SignInPage />}></Route>
      <Route path="/calendar" element={<MonthPage />}></Route>
      <Route path="/todolist" element={<TodoListPage />}></Route>
    </Routes>
  );
};
