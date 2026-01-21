"use client";

import { Box, Divider, Typography } from "@mui/material";

import { BlogCard } from "@/ui/card/blog_card";
import { ItemGrid } from "@/ui/item_grid";
import { blogs } from "@/lib/blog";

export default function Page() {
  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "text.primary" }}
      >
        Blog
      </Typography>
      <Divider sx={{ width: 60, borderBottomWidth: 3, mb: 2 }} />
      <ItemGrid
        items={blogs}
        render_item={(blog, idx) => <BlogCard key={idx} blog={blog} />}
        spacing={1}
      />
    </Box>
  );
}
