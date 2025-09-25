"use client";

import { Box, Button, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { ProjectType, projects } from "@/lib/project";

import Image from "next/image";
import React, { useState } from "react";

interface ProjectParams {
  project: ProjectType;
}

const Project = ({ project }: ProjectParams) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Grid
      size={6}
      className="p-6 border border-gray-300 dark:border-gray-800 rounded-lg"
      sx={{ textAlign: "center", display: "flex", flexDirection: "column" }}
    >
      {/* Project Image */}
      <Box sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 150,
            mb: 2,
          }}
        >
          <Image
            src={
              project.picture_url !== null
                ? project.picture_url
                : `https://api.microlink.io/?url=${encodeURIComponent(
                    project.source_url
                  )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=880`
            }
            alt={`${project.title} Logo`}
            fill
            style={{ objectFit: "cover", borderRadius: 8 }}
            priority
          />
        </Box>

        {/* Title & Description */}
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {project.title}
        </Typography>
        <Box
          sx={{
            mb: 1,
            overflow: "hidden",
            ...(expanded
              ? {}
              : {
                  display: "-webkit-box",
                  WebkitLineClamp: 3, // number of lines to show when collapsed
                  WebkitBoxOrient: "vertical",
                }),
          }}
        >
          <Typography variant="body2" component="div">
            {project.description}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="flex-end">
          <Button
            size="small"
            onClick={() => setExpanded((prev: boolean) => !prev)}
            sx={{ textTransform: "none", p: 0, mb: 2 }}
          >
            {expanded ? "Show less" : "Show more"}
          </Button>
        </Box>
      </Box>
      {/* Tech Stack */}
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        gap={1}
        mb={2}
      >
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
      {/* Action Buttons */}
      <Stack direction="row" justifyContent="center" spacing={2}>
        {project.deployed_url && (
          <Button
            variant="contained"
            href={project.deployed_url}
            target="_blank"
          >
            Visit
          </Button>
        )}
        <Button variant="outlined" href={project.source_url} target="_blank">
          Code
        </Button>
      </Stack>
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
