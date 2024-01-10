import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { todoDayRatioType, todoType } from "@/types/todo";
import { makeInstance } from "@/libs/api/axios";
import dayjs from "dayjs";
import { Contribution } from "../templates/Contribution";
import { useRecoilState } from "recoil";
import { pageState } from "@/atoms/pageState";
import { DailyTodoList } from "../templates/DailyTodoList";

export const MainView = () => {
  const [dayRatio, setDayRatio] = useState<todoDayRatioType[]>([]);
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
  const [todos, setTodos] = useState<todoType[]>([]);

  const [page, setPage] = useRecoilState<string>(pageState);

  const instance = makeInstance();

  useEffect(() => {
    setPage("main");
    // 今年と来年の年を取得
    const currentYear = dayjs().year();
    const startYear = currentYear.toString();
    const endYear = (currentYear + 1).toString();

    const fetchData = async () => {
      try {
        const dayRatio = await instance.get("/todos/day-count", {
          params: {
            start: startYear,
            end: endYear,
          },
        });
        setDayRatio(dayRatio.data);
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
    instance
      .get("/todos", {
        params: {
          date: dayjs(todo.date).format("YYYY-MM-DD"),
        },
      })
      .then(({ data }) => {
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
    instance
      .get("/todos", {
        params: {
          date: dayjs(todo.date).format("YYYY-MM-DD"),
        },
      })
      .then(({ data }) => {
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
    <Box display="flex" flexDirection="column" alignItems="center">
      <Contribution dayRatio={dayRatio} />
      <Box>
        <DailyTodoList
          todo={todo}
          todos={todos}
          tags={[]}
          projects={[]}
          setTodo={setTodo}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
          handleUpdateStatus={handleUpdateStatus}
          handleDelete={handleDelete}
        />
      </Box>
    </Box>
  );
};
