"use client";

import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

import Link from "next/link";

interface BlogPreviewCardProps {
  title: string;
  excerpt: string;
  href: string;
}

export function BlogPreviewCard({
  title,
  excerpt,
  href,
}: BlogPreviewCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
      }}
    >
      <CardActionArea
        component={Link}
        href={href}
        sx={{ height: "100%", alignItems: "stretch" }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {excerpt}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
