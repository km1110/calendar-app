import React, { useState } from "react";

import { Box, Button, Card, Typography, Grid, IconButton } from "@mui/material";
import { CheckBox, Edit } from "@mui/icons-material";

import { todoType } from "@/types/todo";
import { AddTodoDialog } from "./AddTodoDialog";

type Props = {
  todos: todoType[];
};

export const TodoList = ({ todos }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
          <AddTodoDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
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
        <Box sx={{ overflowY: "auto", minHeight: "calc(40px * 10)" }}>
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
                  <CheckBox />
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{item.name}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{item.tag}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>2023/10/19</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{item.project}</Typography>
              </Grid>
              <Grid item xs={1}>
                {hoveredIndex === index && (
                  <IconButton>
                    <Edit />
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
