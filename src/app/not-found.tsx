import { Box, Button, Typography } from "@mui/material";

import type { Metadata } from "next";
import { asset } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found — Ray Kwan",
  description: "That link is out of date or the page has moved.",
};

export default function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" component="h1" fontWeight="bold">
        This page doesn&apos;t exist
      </Typography>
      <Typography variant="body1" mt={2} sx={{ color: "text.secondary" }}>
        The link may be out of date, or the page may have moved.
      </Typography>
      {/* asset() applies basePath by hand: Next only prefixes next/link and the
          router, and a bare href="/" would leave the site on GitHub Pages. */}
      <Button
        href={asset("/")}
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
      >
        Back to home
      </Button>
    </Box>
  );
}
