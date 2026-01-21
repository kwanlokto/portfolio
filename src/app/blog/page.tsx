"use client";

import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { BlogPreviewCard } from "@/ui/blog_preview_card";
import { ItemGrid } from "@/ui/item_grid";
import matter from "gray-matter";

interface BlogPreview {
  id: string;
  title: string;
  excerpt: string;
}

export default function Page() {
  const [posts, setPosts] = useState<BlogPreview[]>([]);

  useEffect(() => {
    fetch("/portfolio/blog/index.json")
      .then((res) => res.json())
      .then(async (ids: string[]) => {
        const previews = await Promise.all(
          ids.map(async (id) => {
            const md = await fetch(`/blog/${id}.md`).then((r) => r.text());
            const { data, content } = matter(md);
            return {
              id,
              title: data.title ?? id.replace(/-/g, " "),
              excerpt: content.split("\n").slice(0, 3).join(" "),
            };
          })
        );
        setPosts(previews);
      });
  }, []);

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
        items={posts}
        render_item={(post) => (
          <BlogPreviewCard
            key={post.id}
            title={post.title}
            excerpt={post.excerpt}
            href={`/blog/${post.id}`}
          />
        )}
        spacing={1}
      />
    </Box>
  );
}
