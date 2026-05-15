"use client";

import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Inter", system-ui, sans-serif';
const MONO_STACK =
  '"SF Mono", ui-monospace, Menlo, Monaco, "Cascadia Mono", Consolas, monospace';

export const MDReader = ({ path }: { path: string }) => {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.text();
      })
      .then(setContent)
      .catch(() => setContent("# 404\nPost not found"));
  }, [path]);

  if (!content) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 680,
        mx: "auto",
        px: { xs: 1, sm: 2 },
        py: { xs: 3, sm: 6 },
        fontFamily: FONT_STACK,
        color: "text.primary",
        fontSize: "1.0625rem",
        lineHeight: 1.65,
        letterSpacing: "-0.003em",
        // Hanging rhythm: first block flush to top
        "& > *:first-of-type": { mt: 0 },
        "& > *:last-child": { mb: 0 },
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <Box
              component="h1"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem" },
                fontWeight: 600,
                letterSpacing: "-0.022em",
                lineHeight: 1.15,
                mt: 0,
                mb: 1.5,
              }}
            >
              {children}
            </Box>
          ),
          h2: ({ children }) => (
            <Box
              component="h2"
              sx={{
                fontSize: { xs: "1.5rem", sm: "1.75rem" },
                fontWeight: 600,
                letterSpacing: "-0.018em",
                lineHeight: 1.25,
                mt: 6,
                mb: 1.25,
              }}
            >
              {children}
            </Box>
          ),
          h3: ({ children }) => (
            <Box
              component="h3"
              sx={{
                fontSize: "1.1875rem",
                fontWeight: 600,
                letterSpacing: "-0.012em",
                lineHeight: 1.35,
                mt: 4,
                mb: 1,
              }}
            >
              {children}
            </Box>
          ),
          h4: ({ children }) => (
            <Box
              component="h4"
              sx={{
                fontSize: "1.0625rem",
                fontWeight: 600,
                letterSpacing: "-0.008em",
                mt: 3,
                mb: 0.75,
              }}
            >
              {children}
            </Box>
          ),
          p: ({ children }) => (
            <Box
              component="p"
              sx={{
                my: 2,
                color: "text.primary",
              }}
            >
              {children}
            </Box>
          ),
          a: ({ href, children }) => (
            <Box
              component="a"
              href={href as string}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "inherit",
                textDecoration: "none",
                borderBottom: "1px solid",
                borderColor: "divider",
                transition: "border-color 0.2s ease",
                "&:hover": { borderColor: "text.primary" },
              }}
            >
              {children}
            </Box>
          ),
          strong: ({ children }) => (
            <Box component="strong" sx={{ fontWeight: 600 }}>
              {children}
            </Box>
          ),
          em: ({ children }) => (
            <Box component="em" sx={{ fontStyle: "italic" }}>
              {children}
            </Box>
          ),
          ul: ({ children }) => (
            <Box
              component="ul"
              sx={{
                my: 2,
                pl: 3,
                listStyle: "disc",
                "& li::marker": { color: "text.secondary" },
              }}
            >
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box
              component="ol"
              sx={{
                my: 2,
                pl: 3,
                listStyle: "decimal",
                "& li::marker": { color: "text.secondary" },
              }}
            >
              {children}
            </Box>
          ),
          li: ({ children }) => (
            <Box
              component="li"
              sx={{
                my: 0.75,
                pl: 0.5,
                "& > p": { my: 0 },
              }}
            >
              {children}
            </Box>
          ),
          blockquote: ({ children }) => (
            <Box
              component="blockquote"
              sx={{
                my: 3,
                pl: 2.5,
                borderLeft: "2px solid",
                borderColor: "divider",
                color: "text.secondary",
                fontStyle: "normal",
                "& p": { my: 1 },
              }}
            >
              {children}
            </Box>
          ),
          hr: () => (
            <Box
              component="hr"
              sx={{
                border: 0,
                borderTop: "1px solid",
                borderColor: "divider",
                my: 6,
                mx: "auto",
                width: "100%",
              }}
            />
          ),
          code: ({ children }) => (
            <Box
              component="code"
              sx={{
                fontFamily: MONO_STACK,
                fontSize: "0.92em",
                px: 0.625,
                py: 0.125,
                borderRadius: 0.75,
                bgcolor: "action.hover",
                // Reset when inside a fenced block (handled by pre wrapper)
                "pre &": {
                  background: "none",
                  padding: 0,
                  borderRadius: 0,
                  fontSize: "inherit",
                },
              }}
            >
              {children}
            </Box>
          ),
          pre: ({ children }) => (
            <Box
              component="pre"
              sx={{
                my: 3,
                px: 2.5,
                py: 2,
                borderRadius: 1.5,
                bgcolor: "action.hover",
                overflowX: "auto",
                fontFamily: MONO_STACK,
                fontSize: "0.9rem",
                lineHeight: 1.6,
              }}
            >
              {children}
            </Box>
          ),
          table: ({ children }) => (
            <Box
              sx={{
                my: 3,
                overflowX: "auto",
                "& table": {
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.9375rem",
                },
                "& th, & td": {
                  textAlign: "left",
                  py: 1.25,
                  px: 1.5,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                },
                "& th": {
                  fontWeight: 600,
                  color: "text.secondary",
                  fontSize: "0.8125rem",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                },
              }}
            >
              <table>{children}</table>
            </Box>
          ),
          img: ({ src, alt }) => (
            <Box
              component="img"
              src={src as string}
              alt={alt as string}
              sx={{
                display: "block",
                maxWidth: "100%",
                height: "auto",
                my: 4,
                mx: "auto",
                borderRadius: 1,
              }}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};
