import { Dispatch, SetStateAction } from "react";

import { Box, Button, TextField } from "@mui/material";

import { diaryType } from "@/types/diary";

type Props = {
  diary: diaryType;
  setDiary: Dispatch<SetStateAction<diaryType>>;
  handleEditDiary: (diary: diaryType) => void;
};

export const EditDiary = ({ diary, setDiary, handleEditDiary }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ height: "5%", marginBottom: "5%" }}>
        <TextField
          value={diary?.title}
          onChange={(e) => setDiary({ ...diary, title: e.target.value })}
          variant="standard"
          placeholder="タイトルを追加"
          sx={{ width: "400px" }}
        />
      </Box>
      <Box sx={{ height: "70%" }}>
        <TextField
          value={diary?.content}
          onChange={(e) => setDiary({ ...diary, content: e.target.value })}
          multiline
          rows={15}
          placeholder="内容を追加"
          sx={{
            width: "400px",
            height: "auto",
            marginBottom: "10px",
            backgroundColor: "#ccc",
          }}
        />
      </Box>
      <Button onClick={() => handleEditDiary(diary)}>記録</Button>
    </Box>
  );
};
