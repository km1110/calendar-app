import { Card, Typography, Box, IconButton, TextField } from "@mui/material";
import { Upload } from "@mui/icons-material";
import { diaryType } from "@/types/diary";

import { Dispatch, SetStateAction } from "react";

type Props = {
  diary: diaryType;
  setDiary: Dispatch<SetStateAction<diaryType>>;
  handleDiary: (diary: diaryType) => void;
};

export const DiaryCard = ({ diary, setDiary, handleDiary }: Props) => {
  return (
    <Card
      sx={{
        width: "500px",
        height: "450px",
        border: "2px solid #ebedf0",
        backgroundColor: "#ebedf0",
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
          value={diary?.title}
          onChange={(e) => setDiary({ ...diary, title: e.target.value })}
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
          value={diary?.content}
          onChange={(e) => setDiary({ ...diary, content: e.target.value })}
          multiline
          rows={12}
          placeholder="内容を追加"
          sx={{
            width: "90%",
            height: "100hv",
            backgroundColor: "#ffffff",
            borderRadius: "5px",
          }}
        />
      </Box>
      <Box sx={{ height: "10%", display: "flex", justifyContent: "center" }}>
        <IconButton
          onClick={() => handleDiary(diary)}
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
