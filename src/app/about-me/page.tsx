"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import { Masonry } from "@mui/lab";
import { Modal } from "@/ui/modal";

export default function Page() {
  const [open, set_open] = useState<boolean>(false);
  const [images, set_images] = useState<string[]>([]);

  return (
    <Grid container spacing={2}>
      {/* About Section */}
      <Grid size={12}>
        <Typography variant="h5" gutterBottom>
          About Me
        </Typography>
        <Typography pt={1}>
          One of the biggest adventures I&apos;ve taken on recently is learning
          hockey as an adult. It hasn&apos;t been easy—balancing on skates,
          taking a few falls, and learning the pace of the game has been
          humbling—but it&apos;s also been incredibly rewarding. Every time I
          get back up and keep going, I&apos;m reminded how much persistence
          pays off.
        </Typography>
        <Typography pt={2}>
          Beyond the rink, I love hiking and traveling—whether it&apos;s
          reaching the top of a trail for an amazing view or exploring a new
          country. I enjoy experiencing different cultures, trying local foods,
          and taking in landscapes that are completely different from home. On
          quieter days, I wind down with video games. These hobbies keep me
          grounded, spark fresh ideas, and recharge me so I can bring new energy
          into my work.
        </Typography>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Hobbies Section */}
      <Grid container spacing={4}>
        {[
          { title: "Traveling", img: "/travel.jpg" },
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
              }}
            >
              <CardActionArea
                onClick={async () => {
                  const res = await fetch(`/portfolio/api/images/${hobby.title.toLowerCase()}`);
                  const data = await res.json();
                  set_images(data);
                  set_open(true);
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
              </CardActionArea>
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

      {/* Masonry Modal */}
      <Modal
        open={open}
        onClose={() => set_open(false)}
        sx={{
          borderRadius: 3,
          boxShadow: 10,
          p: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Pictures
        </Typography>
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
          {images.map((image_src: string, idx: number) => (
            <Box
              key={idx}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: 1,
                transition: "0.3s",
                "&:hover": { boxShadow: 3 },
              }}
            >
              <Image
                src={image_src}
                alt={`collage-${idx}`}
                width={600}
                height={400}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          ))}
        </Masonry>
      </Modal>
    </Box>
  );
}
