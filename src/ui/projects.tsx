import { Box, Button, Icon, Typography } from "@mui/material";
import { ProjectType, projects } from "@/lib/project";

import Image from "next/image";
import React from "react";

interface ProjectParams {
  project: ProjectType;
}
const Project = ({ project }: ProjectParams) => {
  return (
    <Box>
      <Icon sx={{ position: "relative" }}>
        <Image
          src={project.picture_url}
          alt="Next.js logo"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </Icon>
      <Typography> {project.title} </Typography>
      <Typography> {project.description} </Typography>
      {project.tech_stack.map((item: string, idx: number) => {
        return <Typography key={idx}> {item}</Typography>;
      })}
      <Button> Source Code</Button>
    </Box>
  );
};

interface ProjectsParams {
  total_featured_projects?: number;
}

export default function Projects({ total_featured_projects }: ProjectsParams) {
  return (
    <Box>
      {projects
        .map((project: ProjectType, idx: number) => {
          return <Project project={project} key={idx} />;
        })}
    </Box>
  );
}
