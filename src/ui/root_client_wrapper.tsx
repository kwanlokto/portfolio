"use client";

import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useMemo, useSyncExternalStore } from "react";
import {
  get_server_snapshot,
  get_snapshot,
  subscribe,
  toggle_mode,
} from "@/lib/theme_mode";

import { Navbar } from "@/ui/navbar";

export default function RootLayoutClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // useSyncExternalStore rather than useState + an effect: it gives React a
  // server snapshot to hydrate against, so the page renders real content on
  // the server instead of gating the whole tree behind a mounted flag.
  const mode = useSyncExternalStore(
    subscribe,
    get_snapshot,
    get_server_snapshot,
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "light" ? "#fef8e7" : "#1a1a1a",
            paper: mode === "light" ? "#fffaf2" : "#242424",
          },
          text: {
            primary: mode === "light" ? "#0a1f2a" : "#c8c8c8",
            secondary: mode === "light" ? "#577683" : "#b0b0b0",
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
        shape: { borderRadius: 10 },
        typography: {
          h4: { fontWeight: 600, fontSize: "1.875rem" },
          h5: { fontWeight: 600, fontSize: "1.375rem" },
          h6: { fontWeight: 600, fontSize: "1.0625rem" },
          subtitle1: { fontWeight: 600, fontSize: "0.9375rem" },
          body1: { fontSize: "0.9375rem", lineHeight: 1.6 },
          body2: { fontSize: "0.875rem", lineHeight: 1.6 },
          button: { textTransform: "none", fontWeight: 500 },
        },
        components: {
          MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
              root: { textTransform: "none", borderRadius: 8 },
            },
          },
          MuiCard: {
            styleOverrides: { root: { borderRadius: 12 } },
          },
        },
      }),
    [mode],
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: { xs: 1.5, sm: 2, md: 4, lg: 8 },
        }}
      >
        <Container
          maxWidth="md"
          disableGutters
          sx={{ pt: { xs: 2, sm: 4 }, px: { xs: 0, sm: 2 } }}
        >
          <Navbar mode={mode} toggleTheme={toggle_mode} />
          <Box sx={{ pt: { xs: 2.5, sm: 5 }, pb: { xs: 6, sm: 10 } }}>
            {children}
          </Box>
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
