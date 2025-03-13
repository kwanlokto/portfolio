import { Box, Button, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { ProjectType, projects } from "@/lib/project";

import Image from "next/image";
import React from "react";

interface ProjectParams {
  project: ProjectType;
}

const Project = ({ project }: ProjectParams) => {
  return (
    <Grid
      size={6}
      className="p-6 border border-gray-300 dark:border-gray-800 rounded-lg"
      sx={{ textAlign: "center" }}
    >
      {/* Project Image */}
      <Box
        sx={{
          position: "relative",
          width: 80,
          height: 80,
          mx: "auto",
          mb: 2,
        }}
      >
        <Image
          src={project.picture_url}
          alt={`${project.title} Logo`}
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </Box>

      {/* Project Title & Description */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {project.title}
      </Typography>
      <Typography variant="body2" className="dark:text-white" mb={2}>
        {project.description}
      </Typography>

      {/* Tech Stack List */}
      <Stack direction="row" flexWrap="wrap" mb={2} gap={2}>
        {project.tech_stack.map((item: string, idx: number) => (
          <Typography
            key={idx}
            variant="caption"
            className="text-black bg-gray-400"
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 500,
            }}
          >
            {item}
          </Typography>
        ))}
      </Stack>

      {/* Source Code Button */}
      <Button variant="contained" size="small" href={project.source_url} target="_blank">
        Source Code
      </Button>
    </Grid>
  );
};

interface ProjectsParams {
  total_featured_projects?: number;
}

export default function Projects({ total_featured_projects }: ProjectsParams) {
  return (
    <Grid container spacing={2}>
      {projects
        .slice(0, total_featured_projects)
        .map((project: ProjectType, idx: number) => {
          return <Project project={project} key={idx} />;
        })}
    </Grid>
  );
}
