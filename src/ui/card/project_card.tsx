"use client";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { MdCode, MdGetApp, MdLaunch } from "react-icons/md";
import { ProjectType, get_screenshot_url } from "@/lib/project";

import Image from "next/image";
import { handle_download } from "@/utils/download";
import { useState } from "react";

interface ProjectCardProps {
  project: ProjectType;
}

const ACTION_SX = { fontSize: "0.875rem", py: 0.5, px: 2 } as const;

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [expanded, set_expanded] = useState(false);

  const download_url = project.download_url;
  const download_is_external =
    !!download_url && /^https?:\/\//.test(download_url);

  return (
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
        aria-label={`Open ${project.title}`}
      >
        <Box sx={{ position: "relative", height: 170 }}>
          <Image
            src={get_screenshot_url(project)}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            loading="lazy"
            style={{ objectFit: "cover", objectPosition: "center" }}
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
        <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
          {project.title}
        </Typography>
        <Box
          id={`project-description-${project.title}`}
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
            sx={{ color: "text.secondary", whiteSpace: "pre-wrap" }}
          >
            {project.description}
          </Typography>
        </Box>
        <Button
          size="small"
          onClick={() => set_expanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={`project-description-${project.title}`}
          sx={{
            mt: 0.75,
            p: 0,
            minWidth: 0,
            color: "primary.main",
            fontWeight: 500,
            fontSize: "0.8125rem",
            "&:hover": {
              bgcolor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          {expanded ? "Show less" : "Show more"}
        </Button>
      </CardContent>

      <Stack direction="row" flexWrap="wrap" gap={0.75} px={2} pb={1.5}>
        {project.tech_stack.map((tech) => (
          <Typography
            key={tech}
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
        {download_url && (
          <Button
            variant="contained"
            startIcon={<MdGetApp />}
            aria-label={`Download ${project.title}`}
            sx={ACTION_SX}
            {...(download_is_external
              ? { href: download_url, rel: "noopener" }
              : {
                  onClick: () =>
                    handle_download(
                      download_url,
                      download_url.split("/").pop() || "",
                    ),
                })}
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
            aria-label={`${project.deployed_label ?? "Live demo"} — ${project.title}`}
            sx={ACTION_SX}
          >
            {project.deployed_label ?? "Live demo"}
          </Button>
        )}

        <Button
          variant="outlined"
          startIcon={<MdCode />}
          href={project.source_url}
          target="_blank"
          rel="noopener"
          aria-label={`View source code for ${project.title}`}
          sx={ACTION_SX}
        >
          Code
        </Button>
      </CardActions>
    </Card>
  );
};
