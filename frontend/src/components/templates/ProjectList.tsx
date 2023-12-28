import { useState } from "react";
import { Box, Button, Card, Grid, IconButton, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";

import { projectType, projectsType } from "@/types/project";
import { ProjectDialog } from "../parts/ProjectDialog";

type Props = {
  project: projectsType;
  setProject: React.Dispatch<React.SetStateAction<projectsType>>;
  projects: projectsType[];
  handleCreate: () => void;
  handleUpdate: () => void;
  handleDelete: () => void;
};

export const ProjectList = ({
  project,
  setProject,
  projects,
  handleCreate,
  handleUpdate,
  handleDelete,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [typeDialog, setTypeDialog] = useState<"add" | "change">("add");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleAddClick = () => {
    setTypeDialog("add");
    setIsOpen(true);
  };

  const handleChangeClick = (item: projectType) => {
    setProject((prevProject) => ({ ...prevProject, ...item }));
    setTypeDialog("change");
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProject((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClosed = () => {
    setProject({
      id: "",
      title: "",
      description: "",
    });
    setIsOpen(false);
  };

  return (
    <Card variant="outlined" sx={{ width: "100%", border: "1px solid #ccc" }}>
      <Box
        display="flex"
        flexDirection="row"
        sx={{ borderBottom: "1px solid #ccc" }}
      >
        <Typography sx={{ flexGrow: 1, marginTop: "5px", marginLeft: "10px" }}>
          Project
        </Typography>
        <Button onClick={() => handleAddClick()}>追加</Button>
      </Box>
      <Box
        sx={{
          overflowY: "auto",
          height: "120px",
        }}
      >
        {projects &&
          projects.map((item: projectType, index: number) => (
            <Grid
              container
              key={index}
              alignItems="center"
              style={{ minHeight: "40px" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Grid item xs={11}>
                <Typography sx={{ marginLeft: "10px" }}>
                  {item.title}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                {hoveredIndex === index && (
                  <IconButton onClick={() => handleChangeClick(item)}>
                    <Edit />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
        <ProjectDialog
          project={project}
          typeDialog={typeDialog}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          handleCreate={handleCreate}
          handleChange={handleChange}
          handleUpdate={handleUpdate}
        />
      </Box>
    </Card>
  );
};
