"use client";

import {
  Box,
  CircularProgress,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogClient({ id }: { id: string }) {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/portfolio/blog/${id}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.text();
      })
      .then(setContent)
      .catch(() => setContent("# 404\nPost not found"));
  }, [id]);

  if (!content) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth="md" mx="auto" px={3} py={6}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <Typography variant="h4" gutterBottom mt={4}>
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography variant="h5" gutterBottom mt={3}>
              {children}
            </Typography>
          ),
          p: ({ children }) => (
            <Typography variant="body1" paragraph>
              {children}
            </Typography>
          ),
          a: ({ href, children }) => (
            <Link href={href as string} target="_blank" rel="noopener">
              {children}
            </Link>
          ),
          ul: ({ children }) => <List sx={{ pl: 3 }}>{children}</List>,
          li: ({ children }) => (
            <ListItem sx={{ display: "list-item" }}>{children}</ListItem>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
