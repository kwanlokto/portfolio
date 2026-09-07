"use client";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { FONT_STACK, MARKDOWN_COMPONENTS } from "@/ui/markdown/components";
import { useCallback, useEffect, useState } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Status = "loading" | "ready" | "error";

interface Result {
  path: string;
  attempt: number;
  status: Exclude<Status, "loading">;
  content: string;
}

export const MDReader = ({ path }: { path: string }) => {
  const [result, set_result] = useState<Result | null>(null);
  const [attempt, set_attempt] = useState(0);

  const retry = useCallback(() => set_attempt((n) => n + 1), []);

  // Derived, not stored: anything that hasn't resolved for THIS path and
  // attempt is still loading. Keeps the effect free of a synchronous setState.
  const status: Status =
    result && result.path === path && result.attempt === attempt
      ? result.status
      : "loading";

  useEffect(() => {
    // Aborting on cleanup: `path` changes when the reader switches documents,
    // and without this a slow first response could overwrite a newer one.
    const controller = new AbortController();

    fetch(path, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.text();
      })
      .then((content) =>
        set_result({ path, attempt, status: "ready", content }),
      )
      .catch((err) => {
        if (err.name === "AbortError") return;
        set_result({ path, attempt, status: "error", content: "" });
      });

    return () => controller.abort();
  }, [path, attempt]);

  if (status === "loading") {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === "error") {
    return (
      <Box sx={{ textAlign: "center", mt: 6, px: 2 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Couldn&apos;t load this review.
        </Typography>
        <Button variant="outlined" size="small" onClick={retry}>
          Try again
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 680,
        mx: "auto",
        px: { xs: 1, sm: 2 },
        pt: 0.75,
        pb: 6,
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
        components={MARKDOWN_COMPONENTS}
      >
        {result?.content ?? ""}
      </ReactMarkdown>
    </Box>
  );
};
