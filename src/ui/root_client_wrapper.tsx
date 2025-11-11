"use client";

import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useMemo, useState, useEffect } from "react";

import { Navbar } from "@/ui/navbar";

export default function RootLayoutClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // Restore theme from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode") as "light" | "dark" | null;
    if (savedMode) {
      setMode(savedMode);
    }
    setMounted(true);
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme-mode", mode);
    }
  }, [mode, mounted]);

  const theme = useMemo(
    () =>
      createTheme(
        createTheme({
          palette: {
            mode,
            background: {
              default: mode === "light" ? "#fef8e7" : "#1a1a1a",
              paper: mode === "light" ? "#ffffff" : "#242424",
            },
            text: {
              primary: mode === "light" ? "#0a1f2a" : "#e8e8e8",
              secondary: mode === "light" ? "#577683" : "#a8a8a8",
            },
            primary: {
              main: mode === "light" ? "#1a4d6b" : "#5aa5ff",
              light: mode === "light" ? "#2c6b8f" : "#85c0ff",
              dark: mode === "light" ? "#0d3449" : "#3a8eef",
            },
            secondary: {
              main: mode === "light" ? "#c8944d" : "#f0c595",
              light: mode === "light" ? "#ddb073" : "#ffdbba",
              dark: mode === "light" ? "#a67535" : "#d9a870",
            },
            divider: mode === "light" ? "#c9b895" : "#333333",
            action: {
              hover:
                mode === "light"
                  ? "rgba(26, 77, 107, 0.10)"
                  : "rgba(90, 165, 255, 0.12)",
              selected:
                mode === "light"
                  ? "rgba(26, 77, 107, 0.16)"
                  : "rgba(90, 165, 255, 0.16)",
            },
          },
        })
      ),
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
          animation:
            mode === "light"
              ? "shadowGlow 5s infinite"
              : "lightGlow 5s infinite",
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
