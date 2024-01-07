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

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Contribution dayRatio={dayRatio} />
      <Box>
        <DailyTodoList
          setTodo={setTodo}
          handleUpdateStatus={handleUpdateStatus}
        />
      </Box>
    </Box>
  );
};
