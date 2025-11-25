import { Box, Divider, Typography } from "@mui/material";

import { ItemGrid } from "@/ui/item_grid";
import React from "react";
import { projects } from "@/lib/project";
import { Project } from "@/ui/project";
import { system_design_blog } from "@/lib/system_design";

export default function Page() {
  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "text.primary" }}
      >
        System Design Library
      </Typography>
      <Divider sx={{ width: 60, borderBottomWidth: 3, mb: 2 }} />
      <ItemGrid
        items={system_design_blog}
        render_item={(project, index) => (
          <Project key={index} project={project} />
        )}
      />
    </Box>
  );
}
