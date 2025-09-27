"use client";

import { Box, Button, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { ProjectType, projects } from "@/lib/project";

import Image from "next/image";
import React, { useState } from "react";
import { handle_download } from "@/utils/download";

interface ProjectParams {
  project: ProjectType;
}

const Project = ({ project }: ProjectParams) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Grid
      size={6}
      sx={{
        p: 3,
        border: (theme) =>
          `1px solid ${
            theme.palette.mode === "dark"
              ? theme.palette.grey[800]
              : theme.palette.grey[300]
          }`,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
      }}
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
                  WebkitLineClamp: 3,
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
            onClick={() => setExpanded((prev) => !prev)}
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
        {project.tech_stack.map((item, idx) => (
          <Typography
            key={idx}
            variant="caption"
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 500,
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.common.black
                  : theme.palette.common.black,
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.grey[400]
                  : theme.palette.grey[300],
            }}
          >
            {item}
          </Typography>
        ))}
      </Stack>

      {/* Action Buttons */}
      <Stack direction="row" justifyContent="center" spacing={2}>
        {project.download_url && (
          <Button
            variant="contained"
            onClick={() => {
              if (project.download_url) {
                const file_name = project.download_url.split("/").pop() || "";
                handle_download(project.download_url, file_name);
              }
            }}
          >
            Download
          </Button>
        )}
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
