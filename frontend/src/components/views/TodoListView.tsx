import { useEffect, useState } from "react";

import dayjs from "dayjs";

import { makeInstance } from "@/libs/api/axios";
import { todoType } from "@/types/todo";

import { TodoList } from "@/components/templates/TodoList";
import { Box } from "@mui/material";
import { ProjectList } from "../templates/ProjectList";
import { RoutineList } from "../templates/RoutineList";
import { projectType } from "@/types/project";
import { tagType } from "@/types/tag";

export const TodoListView = () => {
  const [todos, setTodos] = useState<todoType[]>([]);
  const [projects, setProjects] = useState<projectType[]>([]);
  const [routines, setRoutines] = useState([]);
  const [tags, setTags] = useState<tagType[]>([]);

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

  const instance = makeInstance();

  // todo, tag, projectのデータを取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [todos, projects, tags] = await Promise.all([
          instance.get("/todos"),
          instance.get("/projects"),
          instance.get("/tags"),
        ]);
        setTodos(todos.data);
        setProjects(projects.data);
        setTags(tags.data);
      } catch (error) {
        console.error("An error occurred while fetching the todo:", error);
      }
    };
    fetchData();
  }, []);

  // todoの作成
  const handleCreate = async () => {
    const body = {
      name: todo.name,
      tag: todo.tag,
      date: dayjs(todo.date),
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

  // todoの更新
  const handleUpdate = async () => {
    const body = {
      name: todo.name,
      tag: todo.tag,
      date: dayjs(todo.date),
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

  // todoのステータス更新
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

  // todoの削除
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
