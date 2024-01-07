import React, { useState } from "react";
import {
  Box,
  Card,
  Checkbox,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { dailyTodoData } from "@/mock/dayTodo";
import { todoType } from "@/types/todo";
import { Edit, DeleteForever, Add } from "@mui/icons-material";

type Props = {
  setTodo: React.Dispatch<React.SetStateAction<todoType>>;
  handleUpdateStatus: (id: string) => void;
  handleDelete: (id: string) => void;
};

export const DailyTodoList = () => {
  const today = dayjs().format("MM月DD日");
  const [dailyTodo, setDailyTodo] = useState(dailyTodoData);

  const [isOpen, setIsOpen] = useState(false);
  const [typeDialog, setTypeDialog] = useState<"add" | "change">("add");

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // const handleChangeClick = (item: todoType) => {
  //   setTodo((prevTodo) => ({ ...prevTodo, ...item }));
  //   setTypeDialog("change");
  //   setIsOpen(true);
  // };

  const handleUpdateStatus = (id: string) => {
    const newTodo = dailyTodo.map((todo) =>
      todo.id === id ? { ...todo, status: !todo.status } : todo
    );
    setDailyTodo(newTodo);
  };

  return (
    <Card
      sx={{
        width: "500px",
        height: "470px",
        border: "2px solid #e1e4e8",
        backgroundColor: "#ebedf0",
      }}
    >
      <Typography sx={{ height: "8%", margin: "5px" }}>
        {today} Todo List
      </Typography>
      <Box sx={{ height: "80%", overflow: "scroll" }}>
        {dailyTodo.map((todo: todoType, index: number) => (
          <Grid
            container
            key={index}
            alignItems="center"
            sx={{
              width: "100%",
              border: "1px solid #e1e4e8",
              backgroundColor: "#ffffff",
              marginLeft: "5px",
              marginRight: "5px",
            }}
            // onMouseEnter={() => setHoveredIndex(index)}
            // onMouseLeave={() => setHoveredIndex(null)}
          >
            <Grid item xs={2}>
              <Typography sx={{ marginLeft: "10px" }}>
                <Checkbox
                  checked={todo.status}
                  id="status"
                  name="status"
                  onChange={() => handleUpdateStatus(todo.id)}
                />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{todo.name}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{todo.tag.name}</Typography>
            </Grid>
          </Grid>
        ))}
      </Box>
      <Box sx={{ height: "12%", display: "flex", justifyContent: "center" }}>
        <IconButton
          sx={{
            width: "70%",
            height: "90%",
            fontSize: "16px",
          }}
        >
          <Add />
          タスクの追加
        </IconButton>
      </Box>
    </Card>
  );
};
