"use client";

import {
  Box,
  Typography,
  Avatar,
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
      {/* Profile Header */}
      <Box mb={6}>
        <Avatar
          src="/profile.jpg" // Replace with your image
          sx={{ width: 100, height: 100, mr: 3 }}
        />
        <Box>
          <Typography variant="h4" fontWeight={500}>
            Ray Kwan
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.grey[400]
                  : theme.palette.grey[600],
            }}
          >
            Software Engineer • Designer • Leader • Problem Solver • Explorer •
            Innovator
          </Typography>
        </Box>
      </Box>

      {/* About Section */}
      <Box>
        <Typography variant="h6" gutterBottom>
          About Me
        </Typography>
        <Typography
          variant="body1"
        >
          I’m a passionate developer with experience in building scalable web
          applications, crafting clean UI, and solving complex problems. I love
          exploring new technologies, working in collaborative teams, and
          turning ideas into real products.
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
