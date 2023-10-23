import React, { useState } from "react";
import { TodoList } from "../templates/TodoList";

export const TodoListView = () => {
  const [todos, setTodos] = useState(["hoge"]);
  return (
    <div>
      <TodoList todos={todos} />
    </div>
  );
};
