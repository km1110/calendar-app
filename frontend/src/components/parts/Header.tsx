import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import dayjs from "dayjs";

type Props = {
  date: dayjs.Dayjs;
  setPrevioustMonth: () => void;
  setNextMonth: () => void;
};

export const Header = ({ date, setPrevioustMonth, setNextMonth }: Props) => {
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
            <MenuIcon />
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
          <Typography variant="h6" component="div">
            {date.format("YYYY年 MM月")}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit">logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
