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

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const DrawerWrapper = ({ isOpen, onClose }: Props) => {
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
            <ListItemButton href="/">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="メイン" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="/todolist">
              <ListItemIcon>
                <PlaylistAddCheck />
              </ListItemIcon>
              <ListItemText primary="TODO" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="/calendar">
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
