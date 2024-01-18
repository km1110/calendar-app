import { Box, Typography } from "@mui/material";

export const TopHeader = () => {
  return (
    <Box>
      <Typography
        sx={{ paddingTop: "20px", paddingLeft: "30px" }}
        style={{
          fontFamily: "Arial",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#69BD83",
        }}
      >
        TaskCopilot
      </Typography>
    </Box>
  );
};
