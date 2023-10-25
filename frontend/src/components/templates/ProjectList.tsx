import { useState } from "react";
import { Box, Button, Card, Grid, IconButton, Typography } from "@mui/material";
import { CheckBox, Edit } from "@mui/icons-material";

import { AddProjectDialog } from "./AddProjectDialog";
import { projectType } from "@/types/project";

type Props = {
  projects: any;
};

export const ProjectList = ({ projects }: Props) => {
  const [project, setProject] = useState<projectType>({
    id: "",
    title: "",
    description: "",
    num: 0,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProject((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box
      marginTop="20px"
      marginLeft="10%"
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
            Project
          </Typography>
          <Button onClick={() => setIsOpen(true)}>追加</Button>
          <AddProjectDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            handleChange={handleChange}
          />
        </Box>
        <Box sx={{ borderBottom: "1px solid" }}>
          <Grid container>
            <Grid item xs={3}>
              <Typography sx={{ marginLeft: "10px", fontSize: "18px" }}>
                進捗率
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ fontSize: "18px" }}>プロジェクト名</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ fontSize: "18px" }}>タスク数</Typography>
            </Grid>
          </Grid>
        </Box>
        {projects.map((item: projectType, index: number) => (
          <Grid
            container
            key={index}
            alignItems="center"
            style={{ minHeight: "40px" }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Grid item xs={3}>
              <Typography sx={{ marginLeft: "10px" }}>
                <CheckBox />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{item.title}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>{item.num}</Typography>
            </Grid>
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
