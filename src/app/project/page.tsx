"use client";

import { Box, Divider, Typography } from "@mui/material";

import { ItemGrid } from "@/ui/item_grid";
import { Project } from "@/ui/project_card";
import { projects } from "@/lib/project";

export default function Page() {
  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "text.primary" }}
      >
        My Projects
      </Typography>
      <Divider sx={{ width: 60, borderBottomWidth: 3, mb: 2 }} />
      <ItemGrid
        items={projects}
        render_item={(project, index) => (
          <Project key={index} project={project} />
        )}
      />
    </Box>
  );
}
