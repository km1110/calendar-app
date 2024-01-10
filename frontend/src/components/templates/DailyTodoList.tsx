import React, { useState } from "react";
import {
  Box,
  Card,
  Checkbox,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";

import dayjs from "dayjs";

import { TodoDialog } from "@/components/parts/TodoDialog";
import { EditButton } from "@/components/templates/EditButton";
import { todoType } from "@/types/todo";
import { tagType } from "@/types/tag";
import { projectType } from "@/types/project";

type Props = {
  todo: todoType;
  todos: todoType[];
  tags: tagType[];
  projects: projectType[];
  setTodo: React.Dispatch<React.SetStateAction<todoType>>;
  handleCreate: () => void;
  handleUpdate: () => void;
  handleUpdateStatus: (id: string) => void;
  handleDelete: (id: string) => void;
};

export const DailyTodoList = ({
  todo,
  todos,
  tags,
  projects,
  setTodo,
  handleCreate,
  handleUpdate,
  handleUpdateStatus,
  handleDelete,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [typeDialog, setTypeDialog] = useState<"add" | "change">("add");

  const handleAdd = () => {
    setTypeDialog("add");
    setIsOpen(true);
  };

  const handleEdit = (todo: todoType) => {
    setTodo((prevTodo) => ({ ...prevTodo, ...todo }));
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
    <Card
      sx={{
        width: "500px",
        height: "450px",
        border: "2px solid #ebedf0",
        backgroundColor: "#ebedf0",
        borderRadius: "10px 10px 0px 0px",
      }}
    >
      <Typography
        sx={{
          height: "8%",
          marginLeft: "10px",
          marginTop: "10px",
          fontFamily: "helvetica neue",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Todo List
      </Typography>
      <Box sx={{ height: "80%", overflow: "scroll" }}>
        {todos.map((dailyTodo: todoType, index: number) => (
          <Grid
            container
            key={index}
            alignItems="center"
            sx={{
              width: "100%",
              border: "1px solid #ebedf0",
              backgroundColor: "#ffffff",
              marginLeft: "5px",
              marginRight: "5px",
            }}
          >
            <Grid item xs={2}>
              <Typography sx={{ marginLeft: "10px" }}>
                <Checkbox
                  checked={dailyTodo.status}
                  id="status"
                  name="status"
                  onChange={() => handleUpdateStatus(dailyTodo.id)}
                />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{
                  fontFamily: "helvetica neue",
                  fontSize: "16px",
                }}
              >
                {dailyTodo.name}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                sx={{
                  fontFamily: "helvetica neue",
                  fontSize: "16px",
                }}
              >
                {dailyTodo.tag.name}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <EditButton
                dailyTodo={dailyTodo}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </Grid>
          </Grid>
        ))}
      </Box>
      <Box sx={{ height: "12%", display: "flex", justifyContent: "center" }}>
        <IconButton
          sx={{
            width: "100%",
            height: "90%",
            fontSize: "16px",
            borderRadius: "0px",
          }}
          onClick={() => handleAdd()}
        >
          <Add />
          タスクの追加
        </IconButton>
      </Box>
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
    </Card>
  );
};
