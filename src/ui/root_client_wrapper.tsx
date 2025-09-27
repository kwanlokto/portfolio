"use client";
import React, { useState, useMemo } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
} from "@mui/material";
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
    </ThemeProvider>
  );
}
