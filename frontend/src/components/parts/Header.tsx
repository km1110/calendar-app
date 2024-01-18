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
  page: string;
  setPrevioustMonth: () => void;
  setNextMonth: () => void;
  handleSignOut: () => void;
  onClickMenu?: () => void;
};

export const Header = ({
  date,
  page,
  setPrevioustMonth,
  setNextMonth,
  handleSignOut,
  onClickMenu,
}: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: "#69BD83" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onClickMenu}
          >
            <MenuIcon />
          </IconButton>
          {page === "calendar" ? (
            <>
              <Typography variant="h6" component="div">
                TaskCopilot
              </Typography>
              <IconButton
                size="small"
                color="inherit"
                onClick={setPrevioustMonth}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <IconButton size="small" color="inherit" onClick={setNextMonth}>
                <ArrowForwardIosIcon />
              </IconButton>
              <Typography variant="h6" component="div">
                {date.format("YYYY年 MM月")}
              </Typography>
            </>
          ) : (
            <Typography
              variant="h6"
              component="div"
              fontFamily="helvetica neue"
            >
              TaskCopilot
            </Typography>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={handleSignOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
