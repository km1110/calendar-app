import React from "react";
import { TodoDialog } from "../parts/TodoDialog";
import {
  Dialog,
  DialogActions,
  IconButton,
  DialogContent,
  Typography,
  TextField,
  Box,
  Button,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { ja } from "date-fns/locale";

import CloseIcon from "@mui/icons-material/Close";

type Props = {
  isOpen: boolean;
  onClose: any;
};

export const AddTodoDialog = ({ isOpen, onClose }: Props) => {
  const currencies = [
    {
      value: "schoole",
      label: "学校",
    },
    {
      value: "job",
      label: "仕事",
    },
    {
      value: "hobby",
      label: "趣味",
    },
    {
      value: "play",
      label: "遊び",
    },
  ];

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs">
      <DialogActions>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
      <DialogContent>
        <Typography>タスク名</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TextField
            size="medium"
            defaultValue=""
            id="name"
            name="name"
            variant="outlined"
            type="text"
            sx={{
              width: { xs: "200px", sm: "360px" },
              background: "white",
              marginBottom: { xs: "20px" },
            }}
            // onChange={handleChange}
          />
        </LocalizationProvider>
        <Typography>カテゴリー</Typography>
        <TextField
          select
          size="medium"
          defaultValue=""
          id="tag"
          name="tag"
          variant="outlined"
          sx={{ width: { xs: "200px", sm: "360px" }, marginBottom: "20px" }}
          // onChange={handleChange}
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
          defaultValue=""
          id="ends_time"
          name="ends_time"
          variant="outlined"
          type="datetime-local"
          sx={{ width: { xs: "200px", sm: "360px" }, marginBottom: "20px" }}
          // onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Button
            onClick={() => {
              // onSubmit();
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
