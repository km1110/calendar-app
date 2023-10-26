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

import { currencies } from "@/mock/tag";
import { todoType } from "@/types/todo";

type Props = {
  todo: todoType;
  isOpen: boolean;
  onClose: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSumbit: () => void;
};

export const TodoDialog = ({
  todo,
  isOpen,
  onClose,
  handleChange,
  handleSumbit,
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
          onChange={handleChange}
        />
        <Typography>カテゴリー</Typography>
        <TextField
          select
          size="medium"
          defaultValue={todo ? todo.tag : ""}
          id="tag"
          name="tag"
          variant="outlined"
          sx={{ width: { xs: "200px", sm: "360px" }, marginBottom: "20px" }}
          onChange={handleChange}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Typography>日付</Typography>
        <TextField
          size="medium"
          defaultValue={todo ? todo.date.format("YYYY-MM-DD") : ""}
          id="date"
          name="date"
          variant="outlined"
          type="date"
          sx={{
            width: { xs: "200px", sm: "360px" },
            background: "white",
            marginBottom: { xs: "20px" },
          }}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Button
            onClick={() => {
              handleSumbit();
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
