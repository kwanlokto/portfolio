import { Box, Divider, Typography } from "@mui/material";

import { ProjectGrid } from "@/ui/project_grid";
import React from "react";

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
      <ProjectGrid />
    </Box>
  );
}
