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
import { initialTags } from "@/mock/tag";
import { tagType } from "@/types/tag";

export const TodoListView = () => {
  const [todos, setTodos] = useState<todoType[]>(initialTodos);
  const [projects, setProjects] = useState<projectType[]>(initialProjects);
  const [routines, setRoutines] = useState([]);
  const [tags, setTags] = useState<tagType[]>(initialTags);

  const [todo, setTodo] = useState<todoType>({
    id: "",
    name: "",
    tag: {
      id: "",
      name: "",
    },
    project: {
      id: "",
      title: "",
    },
    date: dayjs(),
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

    setTodo({
      id: "",
      name: "",
      tag: { id: "", name: "" },
      date: dayjs(),
      project: { id: "", title: "" },
      status: false,
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

    setTodo({
      id: "",
      name: "",
      tag: { id: "", name: "" },
      date: dayjs(),
      project: { id: "", title: "" },
      status: false,
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
      .patch(`/todos/${itemId}/status`, {
        status: newStatus,
      })
      .catch((error) => {
        console.error("An error occurred while updating the status:", error);
      });
  };

  const handleDelete = async (id: string) => {
    await instance
      .delete(`/todos/${id}`)
      .then(() => {
        instance.get("/todos").then(({ data }) => {
          setTodos(data);
        });
      })
      .catch((error) => {
        console.error("An error occurred while deleting the todo:", error);
      });

    setTodo({
      id: "",
      name: "",
      tag: { id: "", name: "" },
      date: dayjs(),
      project: { id: "", title: "" },
      status: false,
    });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <Box width="100%" height="50%">
        <TodoList
          todos={todos}
          todo={todo}
          setTodo={setTodo}
          tags={tags}
          projects={projects}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
          handleUpdateStatus={handleUpdateStatus}
          handleDelete={handleDelete}
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
