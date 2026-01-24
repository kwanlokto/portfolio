"use client";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

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
      <Grid size={12}>
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
          <Box sx={{ position: "relative", height: 120 }}>
            <Image
              src={blog.picture_url || "/default_blog_image.jpg"}
              alt={blog.title}
              fill
              style={{ objectFit: "cover" }}
            />

            {/* subtle gradient overlay */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.25), rgba(0,0,0,0))",
              }}
            />
          </Box>

          <CardContent sx={{ flexGrow: 1, px: 2.5, py: 2 }}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              lineHeight={1.3}
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {blog.title}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Modal open={expanded} onClose={() => setExpanded(false)}>
        <MDReader path={`/portfolio/blog/${blog.id}.md`} />
      </Modal>
    </>
  );
};
