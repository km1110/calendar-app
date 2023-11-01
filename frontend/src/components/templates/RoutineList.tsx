import { todoType } from "@/types/todo";
import { CheckBox, Edit } from "@mui/icons-material";
import { Box, Card, Typography, Button, Grid, IconButton } from "@mui/material";
import React, { useState } from "react";
import { AddRoutineDialog } from "./AddRoutineDialog";
import { routineType } from "@/types/routine";

type Props = {
  routines: any;
};

export const RoutineList = ({ routines }: Props) => {
  const [routine, setRoutine] = useState<routineType>({
    id: "",
    title: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoutine((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box
      marginTop="20px"
      marginRight="10%"
      width="50%"
      height="30%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Card variant="outlined" sx={{ width: "100%", border: "1px solid" }}>
        <Box
          display="flex"
          flexDirection="row"
          sx={{ borderBottom: "1px solid" }}
        >
          <Typography
            variant="h5"
            sx={{ flexGrow: 1, marginTop: "1%", marginLeft: "2%" }}
          >
            Routine
          </Typography>
          <Button onClick={() => setIsOpen(true)}>追加</Button>
          <AddRoutineDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            handleChange={handleChange}
          />
        </Box>
        {/* <Box sx={{ borderBottom: "1px solid" }}>
          <Grid container>
            <Grid item xs={3}>
              <Typography variant="h6" sx={{ marginLeft: "10px" }}>
                進捗率
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="h6">プロジェクト名</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">タスク数</Typography>
            </Grid>
          </Grid>
        </Box> */}
        {routines.map((item: todoType, index: number) => (
          <Grid
            container
            // spacing={3}
            key={index}
            alignItems="center"
            style={{ minHeight: "40px" }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Grid item xs={1}>
              <Typography sx={{ marginLeft: "10px" }}>
                <CheckBox />
              </Typography>
            </Grid>
            {/* <Grid item xs={3}>
              <Typography>{item.name}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>{item.tag}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>2023/10/19</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{item.project}</Typography>
            </Grid> */}
            <Grid item xs={1}>
              {hoveredIndex === index && (
                <IconButton>
                  <Edit />
                </IconButton>
              )}
            </Grid>
          </Grid>
        ))}
      </Card>
    </Box>
  );
};
