"use client";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Stack,
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

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Resolved per project; pre-generated images live under /public/screenshots
// and are produced by scripts/fetch_screenshots.mjs. Falls back to live
// microlink only when nothing else is available.
const get_screenshot_url = (project: ProjectType): string => {
  if (project.deployed_url) {
    return `/portfolio/screenshots/${slug(project.title)}.png`;
  }
  if (project.picture_url) return project.picture_url;
  try {
    const url = new URL(project.source_url);
    if (url.hostname === "github.com") {
      const [owner, repo] = url.pathname.split("/").filter(Boolean);
      if (owner && repo) {
        return `/portfolio/screenshots/${owner}-${repo}.png`;
      }
    }
  } catch {
    // fall through to microlink
  }
  return `https://api.microlink.io/?url=${encodeURIComponent(
    project.source_url,
  )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=400`;
};

export const Project = ({ project }: ProjectParams) => {
  const [expanded, setExpanded] = useState(false);

  const downloadIsExternal =
    !!project.download_url && /^https?:\/\//.test(project.download_url);

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
          bgcolor: "background.paper",
          borderColor: project.featured ? "primary.main" : undefined,
          borderWidth: project.featured ? 2 : 1,
          boxShadow: project.featured ? 2 : 0,
          transition:
            "transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease",
          "&:hover": {
            transform: "translateY(-2px)",
            borderColor: project.featured ? "primary.main" : "text.secondary",
            boxShadow: project.featured ? 6 : 3,
          },
        }}
      >
        <CardActionArea
          component="a"
          href={project.deployed_url ?? project.source_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Box sx={{ position: "relative", height: 170 }}>
            <Image
              src={get_screenshot_url(project)}
              alt={project.title}
              fill
              loading="lazy"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            {project.featured && (
              <Chip
                label="Featured"
                size="small"
                color="primary"
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  fontWeight: 600,
                  fontSize: "0.6875rem",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  height: 22,
                  boxShadow: 2,
                }}
              />
            )}
          </Box>
        </CardActionArea>

        <CardContent sx={{ flexGrow: 1, pb: 1.5 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
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
              transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              maxHeight: expanded ? 500 : 64,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                whiteSpace: "pre-wrap",
              }}
            >
              {project.description}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            onClick={() => setExpanded(!expanded)}
            sx={{
              mt: 0.75,
              cursor: "pointer",
              color: "primary.main",
              fontWeight: 500,
              fontSize: "0.8125rem",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {expanded ? "Show less" : "Show more"}
          </Typography>
        </CardContent>

        <Stack direction="row" flexWrap="wrap" gap={0.75} px={2} pb={1.5}>
          {project.TECH_STACK.map((tech, i) => (
            <Typography
              key={i}
              variant="caption"
              sx={{
                px: 1,
                py: 0.25,
                bgcolor: "action.hover",
                borderRadius: 1,
                color: "text.secondary",
                fontWeight: 500,
              }}
            >
              {tech}
            </Typography>
          ))}
        </Stack>

        <CardActions sx={{ justifyContent: "center", pb: 2, pt: 0 }}>
          {project.download_url &&
            (downloadIsExternal ? (
              <Button
                variant="contained"
                startIcon={<MdGetApp />}
                href={project.download_url}
                rel="noopener"
                aria-label="Download project"
                sx={{
                  fontSize: "0.875rem",
                  py: 0.5,
                  px: 2,
                }}
              >
                Download
              </Button>
            ) : (
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
                aria-label="Download project"
                sx={{
                  fontSize: "0.875rem",
                  py: 0.5,
                  px: 2,
                }}
              >
                Download
              </Button>
            ))}

          {project.deployed_url && (
            <Button
              variant="contained"
              startIcon={<MdLaunch />}
              href={project.deployed_url}
              target="_blank"
              rel="noopener"
              aria-label="Open deployed project"
              sx={{
                fontSize: "0.875rem",
                py: 0.5,
                px: 2,
              }}
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
            aria-label="View source code"
            sx={{
              fontSize: "0.875rem",
              py: 0.5,
              px: 2,
            }}
          >
            Code
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
