"use client";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import { BlogType } from "@/lib/blog";
import Image from "next/image";
import { Modal } from "../modal";
import { useState } from "react";

interface BlogCardParams {
  blog: BlogType;
}

export const BlogCard = ({ blog }: BlogCardParams) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <Grid size={12}>
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
          onClick={() => setExpanded(!expanded)}
        >
          <Box sx={{ position: "relative", height: 60 }}>
            <Image
              src={
                blog.picture_url ||
                `https://api.microlink.io/?url=${encodeURIComponent(
                  blog.source_url,
                )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=880`
              }
              alt={blog.title}
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center", // ✅ centers the image
              }}
            />
          </Box>

          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {blog.title}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Modal open={expanded} onClose={() => setExpanded(false)}>
        <Typography variant="body1" paragraph>
          {blog.title}
        </Typography>
      </Modal>
    </>
  );
};
