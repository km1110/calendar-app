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
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import dayjs from "dayjs";

import { todoType } from "@/types/todo";
import { AddTodoDialog } from "./AddTodoDialog";

type Props = {
  todos: todoType[];
  setTodo: React.Dispatch<React.SetStateAction<todoType>>;
};

export const TodoList = ({ todos, setTodo }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<todoType | null>(null);

  const handleEditClick = (item: todoType) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
          <Button onClick={() => setIsOpen(true)}>追加</Button>
          <AddTodoDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            handleChange={handleChange}
            selectedItem={selectedItem}
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
                    onChange={handleChange}
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
                  <IconButton onClick={() => handleEditClick(item)}>
                    <Edit />
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={0.5}>
                {hoveredIndex === index && (
                  <IconButton onClick={() => handleEditClick(item)}>
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
