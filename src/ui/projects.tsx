"use client";

import {
  Box,
  Button,
  Grid2 as Grid,
  Stack,
  Typography,
  Card,
  CardContent,
  CardActions,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
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
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderRadius: 3,
          overflow: "hidden",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
        }}
      >
        <Box sx={{ position: "relative", height: 180 }}>
          <Image
            src={
              project.picture_url ||
              `https://api.microlink.io/?url=${encodeURIComponent(
                project.source_url
              )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=880`
            }
            alt={project.title}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center", // ✅ centers the image
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            {project.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: expanded ? "unset" : 3,
              overflow: "hidden",
            }}
          >
            {project.description}
          </Typography>
          <Typography
            variant="body2"
            onClick={() => setExpanded(!expanded)}
            sx={{
              mt: 1,
              cursor: "pointer",
              color: "primary.main",
              fontSize: "0.8125rem",
              fontWeight: 500,
              "&:hover": { textDecoration: "underline" }, // subtle hover effect
            }}
          >
            {expanded ? "Show less" : "Show more"}
          </Typography>
        </CardContent>
        <Stack direction="row" flexWrap="wrap" gap={1} px={2} pb={1}>
          {project.tech_stack.map((tech, i) => (
            <Typography
              key={i}
              variant="caption"
              sx={{
                px: 1.3,
                pt: 0.5,
                pb: 0.25,
                bgcolor: "action.hover",
                borderRadius: 1,
              }}
            >
              {tech}
            </Typography>
          ))}
        </Stack>

        <Divider sx={{ my: 1 }} />

        <CardActions sx={{ justifyContent: "center", pb: 2 }}>
          {project.download_url && (
            <Button
              variant="contained"
              onClick={() => {
                if (project.download_url) {
                  handle_download(
                    project.download_url,
                    project.download_url.split("/").pop() || ""
                  );
                }
              }}
              sx={{ py: 0.25 }}
            >
              Download
            </Button>
          )}
          {project.deployed_url && (
            <Button
              variant="contained"
              href={project.deployed_url}
              target="_blank"
              sx={{ py: 0.25 }}
            >
              Visit
            </Button>
          )}
          <Button
            variant="outlined"
            href={project.source_url}
            target="_blank"
            sx={{ py: 0.25 }}
          >
            Code
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

type ResponsiveCount =
  | number
  | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };

interface ProjectsParams {
  total_featured_projects?: ResponsiveCount;
}

export default function Projects({ total_featured_projects }: ProjectsParams) {
  const theme = useTheme();

  // Detect breakpoints from smallest to largest
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  const getVisibleCount = (): number => {
    // If undefined, show all projects
    if (total_featured_projects === undefined) return projects.length;

    // If it's a simple number
    if (typeof total_featured_projects === "number")
      return total_featured_projects;

    // Determine the active breakpoint and pick the appropriate value
    let count: number | undefined;

    if (isXl) count = total_featured_projects.xl;
    else if (isLg) count = total_featured_projects.lg;
    else if (isMd) count = total_featured_projects.md;
    else if (isSm) count = total_featured_projects.sm;
    else count = total_featured_projects.xs;

    // Fallback if none defined
    return (
      count ??
      total_featured_projects.md ??
      total_featured_projects.sm ??
      total_featured_projects.xs ??
      total_featured_projects.lg ??
      total_featured_projects.xl ??
      projects.length
    );
  };

  const visibleCount = getVisibleCount();

  return (
    <Grid container spacing={3}>
      {projects.slice(0, visibleCount).map((project, index) => (
        <Project key={index} project={project} />
      ))}
    </Grid>
  );
}
