import { Box, Typography } from "@mui/material";

import Projects from "@/ui/projects";
import React from "react";

export default function Page() {
  return (
    <Box>
      <Typography> my projects </Typography>
      <Projects />
    </Box>
  );
}
