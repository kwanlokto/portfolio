"use client";

import { Box } from "@mui/material";
import { ItemGrid } from "@/ui/item_grid";
import { PROJECTS } from "@/lib/project";
import { Project } from "@/ui/card/project_card";
import { SectionHeader } from "@/ui/section_header";

export default function Page() {
  return (
    <Box>
      <SectionHeader title="My Projects" variant="page" mb={3} />
      <ItemGrid
        items={PROJECTS}
        render_item={(project, index) => (
          <Project key={index} project={project} />
        )}
      />
    </Box>
  );
}
