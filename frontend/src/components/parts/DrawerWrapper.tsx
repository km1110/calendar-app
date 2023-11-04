import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { Home, CalendarMonth, PlaylistAddCheck } from "@mui/icons-material";
import { SetterOrUpdater } from "recoil";
import { useNavigate } from "react-router-dom";

type Props = {
  setPage: SetterOrUpdater<string>;
  isOpen: boolean;
  onClose: () => void;
};

export const DrawerWrapper = ({ setPage, isOpen, onClose }: Props) => {
  const navigate = useNavigate();
  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <Box
        sx={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <List sx={{ width: "300px" }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setPage("main");
                navigate("/");
              }}
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="メイン" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setPage("todolist");
                navigate("/todolist");
                onClose();
              }}
            >
              <ListItemIcon>
                <PlaylistAddCheck />
              </ListItemIcon>
              <ListItemText primary="TODO" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setPage("calendar");
                navigate("/calendar");
                onClose();
              }}
            >
              <ListItemIcon>
                <CalendarMonth />
              </ListItemIcon>
              <ListItemText primary="カレンダー" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
