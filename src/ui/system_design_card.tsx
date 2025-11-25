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
} from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import { MdLaunch } from "react-icons/md";
import { SystemDesignStudy } from "@/lib/system_design";

interface SystemDesignCardProps {
  system_design_study: SystemDesignStudy; // you can type this as SystemDesignsystem_design_study if you have the type
}

export const SystemDesignCard = ({
  system_design_study,
}: SystemDesignCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const tags = [
    system_design_study.architecture_diagram && "Architecture",
    system_design_study.steps && "Workflow",
    system_design_study.notification_channels && "Notifications",
    system_design_study.schema_definitions && "Data Models",
    system_design_study.technical_sections && "Technical",
  ].filter(Boolean);

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          boxShadow: 1,
          flexDirection: "column",
          height: "100%",
          borderRadius: 3,
          overflow: "hidden",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            {system_design_study.name}
          </Typography>

          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              WebkitMaskImage: expanded
                ? "none"
                : "linear-gradient(to bottom, black 60%, transparent 100%)",
              maskImage: expanded
                ? "none"
                : "linear-gradient(to bottom, black 60%, transparent 100%)",
              transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
              maxHeight: expanded ? 500 : 64,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}
            >
              {system_design_study.description}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            onClick={() => setExpanded(!expanded)}
            sx={{
              mt: 1,
              cursor: "pointer",
              color: "primary.main",
              fontSize: "0.8125rem",
              fontWeight: 500,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {expanded ? "Show less" : "Show more"}
          </Typography>
        </CardContent>

        {tags.length > 0 && (
          <Stack direction="row" flexWrap="wrap" gap={1} px={2} pb={1}>
            {tags.map((tag, i) => (
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
                {tag}
              </Typography>
            ))}
          </Stack>
        )}

        <Divider sx={{ my: 1 }} />

        <CardActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            startIcon={<MdLaunch />}
            component={Link}
            href={`/system-design/${system_design_study.id}`}
            sx={{
              textTransform: "none",
              fontSize: "0.875rem",
              py: 0.5,
              px: 2,
              borderRadius: 1.5,
            }}
            aria-label="View full system design"
          >
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
