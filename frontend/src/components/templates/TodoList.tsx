import { CheckBox } from "@mui/icons-material";
import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";

type Props = {
  todos: any;
};

export const TodoList = ({ todos }: Props) => {
  return (
    <Box
      marginTop="20px"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Card variant="outlined" sx={{ width: "80%" }}>
        <Box
          display="flex"
          flexDirection="row"
          sx={{ borderBottom: "1px solid" }}
        >
          <Typography
            variant="h5"
            sx={{ flexGrow: 1, marginTop: "1%", marginLeft: "2%" }}
          >
            TODO
          </Typography>
          <Button>追加</Button>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          sx={{ borderBottom: "1px solid" }}
        >
          <Typography variant="h6" sx={{ marginLeft: "1%" }}>
            完了
          </Typography>
          <Typography variant="h6">タスク名</Typography>
          <Typography variant="h6">カテゴリー</Typography>
          <Typography variant="h6">日付</Typography>
          <Typography variant="h6">プロジェクト名</Typography>
        </Box>
        <Box display="flex" flexDirection="row">
          {todos.map((item: any, index: number) => (
            <>
              <div>
                <CheckBox />
              </div>
              <Typography>hogehoge</Typography>
              <Typography>school</Typography>
              <Typography>2023/10/19</Typography>
              <Typography>修士研究</Typography>
            </>
          ))}
        </Box>
      </Card>
    </Box>
  );
};
