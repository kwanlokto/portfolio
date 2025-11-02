"use client";

import { Grid2 as Grid, useTheme, useMediaQuery } from "@mui/material";
import { projects } from "@/lib/project";
import React from "react";
import { Project } from "./project";

type ResponsiveCount =
  | number
  | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };

interface ProjectsParams {
  total_featured_projects?: ResponsiveCount;
}

export const ProjectGrid = ({ total_featured_projects }: ProjectsParams) => {
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
};
