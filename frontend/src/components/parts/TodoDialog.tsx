import React from "react";
import {
  Dialog,
  DialogActions,
  IconButton,
  DialogContent,
  Typography,
  TextField,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import dayjs from "dayjs";

import { todoType } from "@/types/todo";
import { tagType } from "@/types/tag";
import { projectType } from "@/types/project";

type Props = {
  todo: todoType;
  tags: tagType[];
  projects: projectType[];
  typeDialog: "add" | "change";
  isOpen: boolean;
  onClose: () => void;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTagChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleProjectChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreate: () => void;
  handleUpdate: () => void;
};

export const TodoDialog = ({
  todo,
  tags,
  projects,
  typeDialog,
  isOpen,
  onClose,
  handleTextChange,
  handleTagChange,
  handleProjectChange,
  handleCreate,
  handleUpdate,
}: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs">
      <DialogActions>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
      <DialogContent>
        <Typography>タスク名</Typography>
        <TextField
          size="medium"
          defaultValue={todo ? todo.name : ""}
          id="name"
          name="name"
          variant="outlined"
          type="text"
          sx={{
            width: { xs: "200px", sm: "360px" },
            background: "white",
            marginBottom: { xs: "20px" },
          }}
          onChange={handleTextChange}
        />
        <Typography>カテゴリー</Typography>
        <TextField
          select
          size="medium"
          value={todo ? todo.tag.name : ""}
          id="tag"
          name="tag"
          variant="outlined"
          sx={{ width: { xs: "200px", sm: "360px" }, marginBottom: "20px" }}
          onChange={handleTagChange}
        >
          {tags.map((item) => (
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
        <Typography>日付</Typography>
        <TextField
          size="medium"
          value={todo ? dayjs(todo.date).format("YYYY-MM-DD") : ""}
          id="date"
          name="date"
          variant="outlined"
          type="date"
          sx={{
            width: { xs: "200px", sm: "360px" },
            background: "white",
            marginBottom: { xs: "20px" },
          }}
          onChange={handleTextChange}
        />
        <Typography>プロジェクト</Typography>
        <TextField
          select
          size="medium"
          value={todo ? todo.project.title : ""}
          id="project"
          name="project"
          variant="outlined"
          sx={{ width: { xs: "200px", sm: "360px" }, marginBottom: "20px" }}
          onChange={handleProjectChange}
        >
          {projects.map((item) => (
            <MenuItem key={item.id} value={item.title}>
              {item.title}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Button
            onClick={() => {
              if (typeDialog === "add") handleCreate();
              else handleUpdate();
              onClose();
            }}
            size="small"
            variant="outlined"
            style={{
              borderColor: "black",
              background: "#014A8F",
            }}
            sx={{
              color: "white",
              width: "160px",
              fontSize: "20px",
            }}
          >
            追加
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
