import React, { useState } from "react";

import {
  Box,
  Button,
  Card,
  Typography,
  Grid,
  IconButton,
  Checkbox,
} from "@mui/material";
import { Edit, DeleteForever } from "@mui/icons-material";

import { todoType } from "@/types/todo";
import { AddTodoDialog } from "./AddTodoDialog";
import { ChangeTodoDialog } from "./ChangeTodoDialog";
import dayjs from "dayjs";

type Props = {
  todos: todoType[];
  todo: todoType;
  setTodo: React.Dispatch<React.SetStateAction<todoType>>;
  handleCreate: () => void;
  handleUpdate: () => void;
  handleUpdateStatus: (id: string) => void;
  handleDelete: (id: string) => void;
};

export const TodoList = ({
  todos,
  todo,
  setTodo,
  handleCreate,
  handleUpdate,
  handleUpdateStatus,
  handleDelete,
}: Props) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenChange, setIsOpenChange] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleChangeClick = (item: todoType) => {
    setTodo((prevTodo) => ({ ...prevTodo, ...item }));
    setIsOpenChange(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClosed = () => {
    setTodo({
      id: "",
      name: "",
      tag: "",
      date: dayjs(),
      project: "",
      status: false,
    });
    setIsOpenAdd(false);
    setIsOpenChange(false);
  };

  return (
    <Box
      marginTop="20px"
      width="100%"
      height="30%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Card
        variant="outlined"
        sx={{
          width: "80%",
          border: "1px solid",
          // minHeight: "calc(40px * 10)",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          sx={{ borderBottom: "1px solid" }}
        >
          <Typography sx={{ flexGrow: 1, marginTop: "1%", marginLeft: "2%" }}>
            TODO
          </Typography>
          <Button onClick={() => setIsOpenAdd(true)}>追加</Button>
          <AddTodoDialog
            todo={todo}
            isOpen={isOpenAdd}
            onClose={handleClosed}
            handleChange={handleChange}
            handleSumbit={handleCreate}
          />
          <ChangeTodoDialog
            todo={todo}
            isOpen={isOpenChange}
            onClose={handleClosed}
            handleChange={handleChange}
            handleSumbit={handleUpdate}
          />
        </Box>
        <Box sx={{ borderBottom: "1px solid" }}>
          <Grid container>
            <Grid item xs={1}>
              <Typography sx={{ fontSize: "18px", marginLeft: "10px" }}>
                完了
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ fontSize: "18px" }}>タスク名</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ fontSize: "18px" }}>カテゴリー</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ fontSize: "18px" }}>日付</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ fontSize: "18px" }}>プロジェクト名</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            overflowY: "auto",
            minHeight: "calc(40px * 10)",
            maxHeight: "calc(40px * 10)",
          }}
        >
          {todos.map((item: todoType, index: number) => (
            <Grid
              container
              key={index}
              alignItems="center"
              style={{ minHeight: "40px" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Grid item xs={1}>
                <Typography sx={{ marginLeft: "10px" }}>
                  <Checkbox
                    checked={item.status}
                    id="status"
                    name="status"
                    onChange={() => handleUpdateStatus(item.id)}
                  />
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{item.name}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{item.tag}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{item.date.format("YYYY/MM/DD")}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{item.project}</Typography>
              </Grid>
              <Grid item xs={0.5}>
                {hoveredIndex === index && (
                  <IconButton onClick={() => handleChangeClick(item)}>
                    <Edit />
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={0.5}>
                {hoveredIndex === index && (
                  <IconButton onClick={() => handleDelete(item.id)}>
                    <DeleteForever />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
        </Box>
      </Card>
    </Box>
  );
};
