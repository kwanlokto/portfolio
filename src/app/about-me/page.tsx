"use client";

import {
  Box,
  Typography,
  Avatar,
  CardContent,
  Divider,
  Grid2 as Grid,
} from "@mui/material";
import Image from "next/image";

import React from "react";

export default function Page() {

  return (
    <Box
      className="max-w-4xl mx-auto px-4 py-8 font-roboto"
      sx={{
        maxWidth: 900,
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {/* Profile Header */}
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar
          src="/profile.jpg" // Replace with your image
          sx={{ width: 96, height: 96, mr: 3 }}
        />
        <Box>
          <Typography variant="h4" fontWeight="500">
            Ray Kwan
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-600 dark:text-gray-400"
          >
            Software Engineer • Designer • Problem Solver
          </Typography>
        </Box>
      </Box>

      {/* About Section */}
      <Box className="mb-6 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            About Me
          </Typography>
          <Typography variant="body1">
            I’m a passionate developer with experience in building scalable web
            applications, crafting clean UI, and solving complex problems. I
            love exploring new technologies, working in collaborative teams, and
            turning ideas into real products.
          </Typography>
        </CardContent>
      </Box>

      {/* Details Section */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box className="mb-6 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Skills
              </Typography>
              <Typography variant="body2">
                • JavaScript / TypeScript <br />
                • React / Next.js <br />
                • Node.js / Express <br />
                • SQL / NoSQL Databases <br />• UI/UX Design
              </Typography>
            </CardContent>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box className="mb-6 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Interests
              </Typography>
              <Typography variant="body2">
                • Building side projects <br />
                • Hiking & outdoor adventures <br />
                • Learning about AI <br />
                • Playing the piano <br />• Photography
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Contact Section */}
      <Box textAlign="center" mb={4}>
        <Typography variant="body1">
          Want to connect? Reach me at{" "}
          <Typography component="span" color="primary">
            lokto.kwan@gmail.com
          </Typography>
        </Typography>
      </Box>

      {/* Hobbies Section */}
      <Grid container spacing={3}>
        {[
          { title: "Travelling", img: "/travel.jpg" },
          { title: "Sports", img: "/sports.jpg" },
          { title: "Photography", img: "/camera.jpg" },
          { title: "Music", img: "/music.jpg" },
        ].map((hobby, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Box className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm hover:shadow-md transition">
              <Image
                src={hobby.img}
                alt={hobby.title}
                width={400}
                height={160}
                className="w-full h-40 object-cover"
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="body1">{hobby.title}</Typography>
              </CardContent>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
