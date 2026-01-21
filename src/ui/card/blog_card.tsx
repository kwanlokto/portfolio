"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import { BlogType } from "@/lib/blog";
import Image from "next/image";
import { MdCode } from "react-icons/md";

interface BlogCardParams {
  blog: BlogType;
}

export const BlogCard = ({ blog }: BlogCardParams) => {
  return (
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
      >
        <Box sx={{ position: "relative", height: 180 }}>
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

        <Divider sx={{ my: 1 }} />

        <CardActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<MdCode />}
            href={blog.source_url} // Open a new modal or page with blog content
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
