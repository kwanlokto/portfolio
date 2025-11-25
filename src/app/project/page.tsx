import { Box, Divider, Typography } from "@mui/material";

import { ItemGrid } from "@/ui/item_grid";
import React from "react";
import { projects } from "@/lib/project";
import { Project } from "@/ui/project";

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
