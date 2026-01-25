"use client";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Rating,
  Typography,
} from "@mui/material";

import { BlogType } from "@/lib/blog";
import Image from "next/image";
import { MDReader } from "@/ui/md_reader";
import { Modal } from "../modal";
import { useState } from "react";

interface BlogCardParams {
  blog: BlogType;
}

export const BlogCard = ({ blog }: BlogCardParams) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <Grid size={{ xs: 12, sm: 4, md: 3 }}>
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            borderRadius: 2,
            overflow: "hidden",
            cursor: "pointer",
            boxShadow: 2,
            transition: "all 0.25s ease",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: 6,
            },
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Box sx={{ position: "relative", height: 160 }}>
            <Image
              src={
                `/portfolio/blog/photos/${blog.picture_url}` ||
                "/default_blog_image.jpg"
              }
              alt={blog.title}
              fill
              style={{ objectFit: "cover" }}
            />

            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.25), rgba(0,0,0,0))",
              }}
            />
          </Box>

          <CardContent
            sx={{
              flexGrow: 1,
              p: 2,
              pb: "32px !important",
              position: "relative",
            }}
          >
            <Typography
              variant="subtitle1"
              lineHeight={1.5}
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {blog.title}
            </Typography>

            {/* Rating pinned bottom-right */}
            <Box sx={{ position: "absolute", bottom: 6, right: 8 }}>
              <Rating
                size="small"
                value={blog.rating}
                precision={0.25}
                readOnly
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Modal open={expanded} onClose={() => setExpanded(false)}>
        <MDReader path={`/portfolio/blog/${blog.id}.md`} />
      </Modal>
    </>
  );
};
