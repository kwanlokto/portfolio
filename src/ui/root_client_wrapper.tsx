"use client";

import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useMemo, useState } from "react";

import { Navbar } from "@/ui/navbar";

export default function RootLayoutClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: { xs: 2, md: 4, lg: 8 },
        }}
      >
        <Container maxWidth="md" sx={{ pt: 4 }}>
          <Navbar
            toggleTheme={() => setMode(mode === "light" ? "dark" : "light")}
          />
          <Box sx={{ pt: 5, pb: 10 }}>{children}</Box>
        </Container>
      </Box>
      <Box
        style={{
          animation: "rgbPulse 5s infinite",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: 5,
        }}
      />
    </ThemeProvider>
  );
}
