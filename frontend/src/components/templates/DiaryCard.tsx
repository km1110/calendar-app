import { Card, Typography, Box, IconButton, TextField } from "@mui/material";
import { Upload } from "@mui/icons-material";

export const DiaryCard = () => {
  return (
    <Card
      sx={{
        width: "500px",
        height: "450px",
        border: "2px solid #ebedf0",
        backgroundColor: "#EBF4EF",
        borderRadius: "10px 10px 0px 0px",
      }}
    >
      <Typography
        sx={{
          height: "8%",
          marginLeft: "10px",
          marginTop: "10px",
          fontFamily: "helvetica neue",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#333333",
        }}
      >
        Diary
      </Typography>
      <Box
        sx={{
          height: "10%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          size="small"
          variant="standard"
          placeholder="タイトルを追加"
          sx={{ height: "100hv", width: "90%" }}
        />
      </Box>
      <Box
        sx={{
          height: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{
            width: "90%",
            height: "100hv",
            backgroundColor: "#ffffff",
            borderRadius: "5px",
          }}
          multiline
          rows={12}
          placeholder="内容を追加"
        />
      </Box>
      <Box sx={{ height: "10%", display: "flex", justifyContent: "center" }}>
        <IconButton
          sx={{
            width: "30%",
            height: "90%",
            fontSize: "16px",
            borderRadius: "0px",
          }}
        >
          <Upload />
          更新
        </IconButton>
      </Box>
    </Card>
  );
};
