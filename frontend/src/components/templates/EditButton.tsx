import React from "react";
import {
  Box,
  IconButton,
  Popover,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { MoreHoriz, Edit, Delete } from "@mui/icons-material";

import { todoType } from "@/types/todo";

type Props = {
  dailyTodo: todoType;
  handleEdit: (todo: todoType) => void;
  handleDelete: (id: string) => void;
};

export const EditButton = ({ dailyTodo, handleEdit, handleDelete }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const theme = createTheme({
    components: {
      MuiPopover: {
        styleOverrides: {
          paper: {
            boxShadow: "none",
          },
        },
      },
    },
  });
  return (
    <>
      <IconButton
        sx={{
          width: "30px",
          height: "30px",
          fontSize: "16px",
        }}
        aria-describedby={id}
        onClick={handleClick}
      >
        <MoreHoriz />
      </IconButton>
      <ThemeProvider theme={theme}>
        <Popover
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          style={{ boxShadow: "none" }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <IconButton onClick={() => handleEdit(dailyTodo)}>
              <Edit />
              <Typography sx={{ marginLeft: "5px" }}>編集</Typography>
            </IconButton>
            <IconButton onClick={() => handleDelete(dailyTodo.id)}>
              <Delete />
              <Typography sx={{ marginLeft: "5px" }}>削除</Typography>
            </IconButton>
          </Box>
        </Popover>
      </ThemeProvider>
    </>
  );
};
