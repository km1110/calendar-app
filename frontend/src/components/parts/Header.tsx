import {
  AppBar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

type Props = {
  setPrevioustMonth: any;
  setNextMonth: any;
};

export const Header = ({ setPrevioustMonth, setNextMonth }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuItem />
          </IconButton>
          <Typography variant="h6" component="div">
            Calender
          </Typography>
          <IconButton size="small" color="inherit" onClick={setPrevioustMonth}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton size="small" color="inherit" onClick={setNextMonth}>
            <ArrowForwardIosIcon />
          </IconButton>
          <Button color="inherit">login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
