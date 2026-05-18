"use client";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
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

export const Project = ({ project }: ProjectParams) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderRadius: 2.5,
          overflow: "hidden",
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          transition: "transform 0.25s ease, border-color 0.25s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            borderColor: "text.secondary",
          },
        }}
      >
        <CardActionArea
          component="a"
          href={project.deployed_url ?? project.source_url}
          target="_blank"
          rel="noopener noreferrer"
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
                objectPosition: "center",
              }}
            />
          </Box>
        </CardActionArea>

        <CardContent sx={{ flexGrow: 1, pb: 1.5 }}>
          <Typography
            sx={{
              fontSize: "1.0625rem",
              fontWeight: 600,
              letterSpacing: "-0.012em",
              mb: 1,
              color: "text.primary",
            }}
          >
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
              maxHeight: expanded ? 500 : 64,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.9375rem",
                color: "text.secondary",
                lineHeight: 1.55,
                whiteSpace: "pre-wrap",
              }}
            >
              {project.description}
            </Typography>
          </Box>
          <Typography
            onClick={() => setExpanded(!expanded)}
            sx={{
              mt: 1,
              cursor: "pointer",
              color: "text.secondary",
              fontSize: "0.8125rem",
              fontWeight: 500,
              display: "inline-block",
              "&:hover": { color: "text.primary" },
            }}
          >
            {expanded ? "Show less" : "Show more"}
          </Typography>
        </CardContent>

        <Stack direction="row" flexWrap="wrap" gap={0.75} px={2} pb={1.5}>
          {project.TECH_STACK.map((tech, i) => (
            <Typography
              key={i}
              sx={{
                fontSize: "0.75rem",
                px: 1,
                py: 0.375,
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

        <CardActions
          sx={{
            justifyContent: "flex-start",
            gap: 0.5,
            px: 1.5,
            pb: 2,
            pt: 0.5,
          }}
        >
          {project.download_url && (
            <Button
              variant="contained"
              size="small"
              startIcon={<MdGetApp />}
              onClick={() => {
                if (project.download_url) {
                  handle_download(
                    project.download_url,
                    project.download_url.split("/").pop() || "",
                  );
                }
              }}
              sx={{ fontSize: "0.8125rem" }}
              aria-label="Download project"
            >
              Download
            </Button>
          )}

          {project.deployed_url && (
            <Button
              variant="contained"
              size="small"
              startIcon={<MdLaunch />}
              href={project.deployed_url}
              target="_blank"
              rel="noopener"
              sx={{ fontSize: "0.8125rem" }}
              aria-label="Open deployed project"
            >
              Visit
            </Button>
          )}

          <Button
            variant="outlined"
            size="small"
            startIcon={<MdCode />}
            href={project.source_url}
            target="_blank"
            rel="noopener"
            sx={{ fontSize: "0.8125rem" }}
            aria-label="View source code"
          >
            Code
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
