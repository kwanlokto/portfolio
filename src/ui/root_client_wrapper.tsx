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

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "light" ? "#fcf5e4" : "#1a1a1a",
            paper: mode === "light" ? "#ffffff" : "#242424",
          },
          text: {
            primary: mode === "light" ? "#132934" : "#e8e8e8",
            secondary: mode === "light" ? "#4a5c66" : "#a8a8a8",
          },
          primary: {
            main: mode === "light" ? "#2c5f7f" : "#5aa5ff",
            light: mode === "light" ? "#4a8aaf" : "#85c0ff",
            dark: mode === "light" ? "#1a4560" : "#3a8eef",
          },
          secondary: {
            main: mode === "light" ? "#d4a574" : "#f0c595",
            light: mode === "light" ? "#e6c399" : "#ffdbba",
            dark: mode === "light" ? "#b8864f" : "#d9a870",
          },
          divider: mode === "light" ? "#d9cbb0" : "#333333",
          action: {
            hover:
              mode === "light"
                ? "rgba(44, 95, 127, 0.08)"
                : "rgba(90, 165, 255, 0.12)",
            selected:
              mode === "light"
                ? "rgba(44, 95, 127, 0.12)"
                : "rgba(90, 165, 255, 0.16)",
          },
        },
      }),
    [mode]
  );

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
