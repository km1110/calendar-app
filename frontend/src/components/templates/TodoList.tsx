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

import dayjs from "dayjs";

import { todoType } from "@/types/todo";
import { tagType } from "@/types/tag";
import { projectType } from "@/types/project";
import { TodoDialog } from "@/components/parts/TodoDialog";

type Props = {
  todos: todoType[];
  todo: todoType;
  setTodo: React.Dispatch<React.SetStateAction<todoType>>;
  tags: tagType[];
  projects: projectType[];
  handleCreate: () => void;
  handleUpdate: () => void;
  handleUpdateStatus: (id: string) => void;
  handleDelete: (id: string) => void;
};

export const TodoList = ({
  todos,
  todo,
  setTodo,
  tags,
  projects,
  handleCreate,
  handleUpdate,
  handleUpdateStatus,
  handleDelete,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [typeDialog, setTypeDialog] = useState<"add" | "change">("add");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleAddClick = () => {
    setTypeDialog("add");
    setIsOpen(true);
  };

  const handleChangeClick = (item: todoType) => {
    setTodo((prevTodo) => ({ ...prevTodo, ...item }));
    setTypeDialog("change");
    setIsOpen(true);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagName = e.target.value;
    const selectTag = tags.find((tag) => tag.name === tagName);

    if (selectTag) {
      setTodo((prevData) => ({
        ...prevData,
        tag: selectTag,
      }));
    }
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const projectTitle = e.target.value;
    const selectProject = projects.find(
      (project) => project.title === projectTitle
    );

    if (selectProject) {
      setTodo((prevData) => ({
        ...prevData,
        project: selectProject,
      }));
    }
  };

  const handleClosed = () => {
    setTodo({
      id: "",
      name: "",
      tag: { id: "", name: "" },
      date: dayjs(),
      project: { id: "", title: "" },
      status: false,
    });
    setIsOpen(false);
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
          width: "60%",
          border: "1px solid #ccc",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          sx={{ borderBottom: "1px solid #ccc" }}
        >
          <Typography
            sx={{ flexGrow: 1, marginTop: "5px", marginLeft: "10px" }}
          >
            TODO
          </Typography>
          <Button onClick={() => handleAddClick()}>追加</Button>
        </Box>
        <Box sx={{ borderBottom: "1px solid #ccc" }}>
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
            minHeight: "calc(35px * 12)",
            maxHeight: "calc(35px * 12)",
          }}
        >
          {todos &&
            todos.map((item: todoType, index: number) => (
              <Grid
                container
                key={index}
                alignItems="center"
                style={{ height: "35px" }}
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
                  <Typography>{item.tag.name}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>
                    {dayjs(item.date).format("YYYY/MM/DD")}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>{item.project.title}</Typography>
                </Grid>
                <Grid item xs={0.5}>
                  {hoveredIndex === index && (
                    <IconButton
                      size="small"
                      onClick={() => handleChangeClick(item)}
                    >
                      <Edit />
                    </IconButton>
                  )}
                </Grid>
                <Grid item xs={0.5}>
                  {hoveredIndex === index && (
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteForever />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            ))}
          <TodoDialog
            todo={todo}
            tags={tags}
            projects={projects}
            typeDialog={typeDialog}
            isOpen={isOpen}
            onClose={handleClosed}
            handleTextChange={handleTextChange}
            handleTagChange={handleTagChange}
            handleProjectChange={handleProjectChange}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
          />
        </Box>
      </Card>
    </Box>
  );
};
