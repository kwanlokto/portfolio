"use client";

import { Box, Divider, Typography } from "@mui/material";

import { ItemGrid } from "@/ui/item_grid";
import { SystemDesignCard } from "@/ui/system_design_card";
import { system_design_studies } from "@/lib/system_design";

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
        items={system_design_studies}
        render_item={(project, index) => (
          <SystemDesignCard key={index} system_design_study={project} />
        )}
      />
    </Box>
  );
}
