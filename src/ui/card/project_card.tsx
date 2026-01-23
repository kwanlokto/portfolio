"use client";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { MdCode, MdGetApp, MdLaunch } from "react-icons/md";

import Image from "next/image";
import { ProjectType } from "@/lib/project";
import { handle_download } from "@/utils/download";
import { useState } from "react";

interface ProjectParams {
  project: ProjectType;
}

export const Project = ({ project }: ProjectParams) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          boxShadow: 2,
          flexDirection: "column",
          height: "100%",
          borderRadius: 2,
          overflow: "hidden",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
        }}
      >
        <Tooltip title={`Open ${project.title} in new tab`} arrow placement="right">
          <CardActionArea
            component="a"
            href={project.source_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ height: "100%" }}
          >
            <Box sx={{ position: "relative", height: 180 }}>
              <Image
                src={
                  project.picture_url ||
                  `https://api.microlink.io/?url=${encodeURIComponent(
                    project.source_url,
                  )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=400`
                }
                alt={project.title}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center", // ✅ centers the image
                }}
              />
            </Box>
          </CardActionArea>
        </Tooltip>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            {project.title}
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
              maxHeight: expanded ? 500 : 64, // ≈3 lines
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                whiteSpace: "pre-wrap",
                lineHeight: 1.5,
              }}
            >
              {project.description}
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
              "&:hover": { textDecoration: "underline" }, // subtle hover effect
            }}
          >
            {expanded ? "Show less" : "Show more"}
          </Typography>
        </CardContent>
        <Stack direction="row" flexWrap="wrap" gap={1} px={2} pb={1}>
          {project.tech_stack.map((tech, i) => (
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
              {tech}
            </Typography>
          ))}
        </Stack>

        <Divider sx={{ my: 1 }} />

        <CardActions sx={{ justifyContent: "center", pb: 2 }}>
          {project.download_url && (
            <Button
              variant="contained"
              startIcon={<MdGetApp />}
              onClick={() => {
                if (project.download_url) {
                  handle_download(
                    project.download_url,
                    project.download_url.split("/").pop() || "",
                  );
                }
              }}
              sx={{
                textTransform: "none",
                fontSize: "0.875rem",
                py: 0.5,
                px: 2,
                borderRadius: 1.5,
              }}
              aria-label="Download project"
            >
              Download
            </Button>
          )}

          {project.deployed_url && (
            <Button
              variant="contained"
              startIcon={<MdLaunch />}
              href={project.deployed_url}
              target="_blank"
              rel="noopener"
              sx={{
                textTransform: "none",
                fontSize: "0.875rem",
                py: 0.5,
                px: 2,
                borderRadius: 1.5,
              }}
              aria-label="Open deployed project"
            >
              Visit
            </Button>
          )}

          <Button
            variant="outlined"
            startIcon={<MdCode />}
            href={project.source_url}
            target="_blank"
            rel="noopener"
            sx={{
              textTransform: "none",
              fontSize: "0.875rem",
              py: 0.5,
              px: 2,
              borderRadius: 1.5,
              borderWidth: 1,
            }}
            aria-label="View source code"
          >
            Code
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
