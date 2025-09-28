import { Box, Typography } from "@mui/material";

import Projects from "@/ui/projects";
import React from "react";

export default function Page() {
  return (
    <Box>
      <Typography mb={2} variant="h5">
        My Projects
      </Typography>
      <Projects />
    </Box>
  );
}
