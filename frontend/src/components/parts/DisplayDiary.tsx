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
      <Box sx={{ height: "5%", marginBottom: "5%" }}>
        <Typography
          sx={{
            width: "400px",
            borderBottom: "1px solid #ccc",
            backgroundColor: "#fff",
            paddingTop: "4px",
            paddingBottom: "4px",
          }}
        >
          {diary?.title}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "400px",
          height: "70%",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#fff",
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
          padding: "15px",
        }}
      >
        {diary?.content}
      </Box>
      <Button onClick={() => setIsEdit(true)}>編集</Button>
    </Box>
  );
};
