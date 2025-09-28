"use client";

import {
  Box,
  Typography,
  CardContent,
  Divider,
  Grid2 as Grid,
  Card,
} from "@mui/material";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <Box>

      {/* About Section */}
      <Box>
        <Typography variant="h5" gutterBottom>
          About Me
        </Typography>
        <Typography pt={1}>
          One of the biggest adventures I’ve taken on recently is learning
          hockey as an adult. It hasn’t been easy—balancing on skates, taking a
          few falls, and learning the pace of the game has been humbling—but
          it’s also been incredibly rewarding. Every time I get back up and keep
          going, I’m reminded how much persistence pays off.
        </Typography>
        <Typography pt={2}>
          Beyond the rink, I love hiking and traveling—whether it’s reaching the
          top of a trail for an amazing view or exploring a new country. I enjoy
          experiencing different cultures, trying local foods, and taking in
          landscapes that are completely different from home. On quieter days, I
          wind down with video games. These hobbies keep me grounded, spark
          fresh ideas, and recharge me so I can bring new energy into my work.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Hobbies Section */}
      <Grid container spacing={4}>
        {[
          { title: "Travelling", img: "/travel.jpg" },
          { title: "Sports", img: "/sports.jpg" },
          { title: "Photography", img: "/camera.jpg" },
          { title: "Music", img: "/music.jpg" },
        ].map((hobby, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: 1,
                transition: "box-shadow 0.2s",
                "&:hover": { boxShadow: 3 },
                bgcolor: (theme) =>
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[700]
                    : theme.palette.grey[200],
              }}
            >
              <Box sx={{ width: "100%", height: 160, position: "relative" }}>
                <Image
                  src={hobby.img}
                  alt={hobby.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="body1" fontWeight={500}>
                  {hobby.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Contact Section */}
      <Box textAlign="center">
        <Typography
          variant="body1"
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.grey[300]
                : theme.palette.grey[700],
          }}
        >
          Want to connect? Reach me at{" "}
          <Typography component="span" color="primary" fontWeight={500}>
            lokto.kwan@gmail.com
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
