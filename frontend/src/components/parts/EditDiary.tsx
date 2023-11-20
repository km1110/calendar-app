import { Dispatch, SetStateAction } from "react";

import { Box, Button, TextField } from "@mui/material";

import { diaryType } from "@/types/diary";

type Props = {
  diary: diaryType;
  setDiary: Dispatch<SetStateAction<diaryType>>;
  setIsEdit: (isEdit: boolean) => void;
};

export const EditDiary = ({ diary, setDiary, setIsEdit }: Props) => {
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
      <TextField
        value={diary.title}
        onChange={(e) => setDiary({ ...diary, title: e.target.value })}
        variant="standard"
        placeholder="タイトルを追加"
        sx={{ width: "400px", height: "10%", marginBottom: "10px" }}
      />
      <TextField
        value={diary.content}
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
      <Button onClick={() => setIsEdit(false)}>記録</Button>
    </Box>
  );
};
