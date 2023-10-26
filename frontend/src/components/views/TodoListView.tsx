import React, { useEffect, useState } from "react";

import dayjs from "dayjs";

import { makeIntance } from "@/libs/api/axios";
import { todoType } from "@/types/todo";

import { TodoList } from "../templates/TodoList";
import { Box } from "@mui/material";
import { ProjectList } from "../templates/ProjectList";
import { RoutineList } from "../templates/RoutineList";
import { projectType } from "@/types/project";
import { initialTodos } from "@/mock/todo";
import { initialProjects } from "@/mock/project";

export const TodoListView = () => {
  const [todos, setTodos] = useState<todoType[]>(initialTodos);
  const [projects, setProjects] = useState<projectType[]>(initialProjects);
  const [routines, setRoutines] = useState([]);

  const [todo, setTodo] = useState<todoType>({
    id: "",
    name: "",
    tag: "",
    date: dayjs(),
    project: "",
    status: false,
  });

  const instance = makeIntance();

  // useEffect(() => {
  //   const getTodoLists = async () => {
  //     instance
  //       .get("/todos")
  //       .then(({ data }) => {
  //         setTodos(data);
  //       })
  //       .catch((error) => {
  //         console.error("An error occurred while fetching the todos:", error);
  //       });
  //   };
  //   getTodoLists();
  // }, []);

  const handleCreate = async () => {
    const body = {
      name: todo.name,
      tag: todo.tag,
      date: todo.date.toISOString(),
      project: todo.project,
      status: todo.status,
    };
    await instance.post("/todos", body);
    instance.get("/todos").then(({ data }) => {
      setTodos(data);
    });
  };

  const handleUpdate = async () => {
    const body = {
      name: todo.name,
      tag: todo.tag,
      date: todo.date.toISOString(),
      project: todo.project,
      status: todo.status,
    };
    await instance.patch(`/todos/${todo.id}`, body);
    instance.get("/todos").then(({ data }) => {
      setTodos(data);
    });
  };

  const handleUpdateStatus = async (itemId: string) => {
    let newStatus;
    const newTodos = todos.map((item) => {
      if (item.id === itemId) {
        newStatus = !item.status;
        return { ...item, status: newStatus };
      } else {
        return item;
      }
    });
    setTodos(newTodos);

    await instance
      .put(`/todos/${itemId}/status`, {
        status: newStatus,
      })
      .catch((error) => {
        console.error("An error occurred while updating the status:", error);
      });
  };

  const handleDelete = async () => {};

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <Box width="100%" height="50%">
        <TodoList
          todos={todos}
          todo={todo}
          setTodo={setTodo}
          handleUpdateStatus={handleUpdateStatus}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap="20px"
        width="100%"
      >
        {/* <ProjectList projects={projects} handleDelete={handleDelete} />
        <RoutineList routines={routines} /> */}
      </Box>
    </Box>
  );
};
