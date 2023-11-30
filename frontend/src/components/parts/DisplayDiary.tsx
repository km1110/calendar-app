import { Box, Button, Typography } from "@mui/material";

import { diaryType } from "@/types/diary";

type Props = {
  diary: diaryType;
  setIsEdit: (isEdit: boolean) => void;
};

export const DisplayDiary = ({ diary, setIsEdit }: Props) => {
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
      <Typography
        sx={{
          width: "400px",
          height: "10%",
          borderBottom: "1px solid #ccc",
          backgroundColor: "#fff",
          marginBottom: "10px",
        }}
      >
        {diary?.title}
      </Typography>
      <Box
        sx={{
          width: "400px",
          height: "70%",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#fff",
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
          padding: "10px",
        }}
      >
        {diary?.content}
      </Box>
      <Button onClick={() => setIsEdit(true)}>編集</Button>
    </Box>
  );
};
