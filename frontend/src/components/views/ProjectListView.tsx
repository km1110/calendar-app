import React, { useEffect, useState } from "react";
import { ProjectList } from "../templates/ProjectList";
import { projectsType } from "@/types/project";
import { Box } from "@mui/material";
import { makeInstance } from "@/libs/api/axios";
import { set } from "date-fns";
import { useRecoilState } from "recoil";
import { projectState } from "@/atoms/projectState";

export const ProjectListView = () => {
  const [projects, setProjects] = useRecoilState<projectsType[]>(projectState);

  const [project, setProject] = useState<projectsType>({
    id: "",
    title: "",
    description: "",
  });

  const instance = makeInstance();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projects = await instance.get("/projects");
        setProjects(projects.data);
      } catch (error) {
        console.error("An error occurred while fetching the todo:", error);
      }
    };
    fetchData();
  }, []);

  const handleCreate = async () => {
    const body = {
      title: project.title,
      description: project.description,
    };
    await instance.post("/projects", body);
    instance.get("/projects").then(({ data }) => {
      setProjects(data);
    });

    setProject({
      id: "",
      title: "",
      description: "",
    });
  };

  const handleUpdate = async () => {
    const body = {
      title: project.title,
      description: project.description,
    };
    await instance.patch(`/projects/${project.id}`, body);
    instance.get("/projects").then(({ data }) => {
      setProjects(data);
    });

    setProject({
      id: "",
      title: "",
      description: "",
    });
  };

  const handleDelete = () => {};
  return (
    <Box width="100%">
      <ProjectList
        project={project}
        setProject={setProject}
        projects={projects}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </Box>
  );
};
