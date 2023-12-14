import { Box, Button, Typography } from "@mui/material";
import React from "react";
import calendar_img from "@/assets/calendar.png";
import { Link } from "react-router-dom";

export const Top = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      gap="50px"
      marginTop="100px"
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" sx={{ marginBottom: "7px" }}>
          あなたの時間、より良いものに
        </Typography>
        <Typography sx={{ marginBottom: "20px" }}>毎日に充実を</Typography>
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Button
            size="small"
            variant="outlined"
            component={Link}
            to="/signup"
            style={{
              borderColor: "black",
              background: "#014A8F",
            }}
            sx={{
              color: "white",
              marginTop: { xs: "10px", sm: "0px" },
              marginX: "10px",
              width: "160px",
              fontSize: "20px",
            }}
          >
            登録
          </Button>
          <Button
            size="small"
            variant="outlined"
            component={Link}
            to="/signin"
            style={{
              borderColor: "black",
              background: "#ffffff",
            }}
            sx={{
              color: "black",
              marginTop: { xs: "10px", sm: "0px" },
              marginX: "10px",
              width: "160px",
              fontSize: "20px",
            }}
          >
            ログイン
          </Button>
        </Box>
      </Box>
      <Box>
        <img
          src="./images/calendar.png"
          alt="logo"
          width="550px"
          height="500px"
        />
      </Box>
    </Box>
  );
};
