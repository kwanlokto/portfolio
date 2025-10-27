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
import { hobby_images } from "@/lib/hobby_images";

export default function Page() {
  const [open, set_open] = useState<boolean>(false);
  const [images, set_images] = useState<string[]>([]);

  return (
    <Box>
      {/* About Section */}
      <Typography mb={2} variant="h5">
        About Me
      </Typography>
      <Typography pt={1}>
        One of the coolest (and toughest) things I&apos;ve taken on lately is
        learning hockey as an adult. It&apos;s been a mix of falling, getting
        back up, and slowly figuring things out—but it&apos;s been a blast.
        Every time I make a little progress, it reminds me why I love learning
        new things.
      </Typography>
      <Typography pt={2}>
        Outside the rink, I&apos;m usually hiking, traveling, or checking out
        new places to eat. I love exploring different cultures and taking in new
        views, but I&apos;m just as happy having a chill day playing video
        games. Those moments keep me balanced and recharged for whatever&apos;s
        next.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={4}>
        {[
          { title: "Traveling", img: "/portfolio/travel.png" },
          { title: "Sports", img: "/portfolio/sport.png" },
        ].map((hobby, index) => (
          <Grid size={6} key={index}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 1,
                border: (theme) =>
                  `1px solid ${
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[800]
                      : theme.palette.grey[400]
                  }`,
                transition: "box-shadow 0.2s",
                "&:hover": { boxShadow: 3 },
              }}
            >
              <CardActionArea
                onClick={async () => {
                  const hobby_title = hobby.title.toLowerCase();
                  const image_titles = hobby_images[hobby_title];

                  set_images(
                    image_titles.map(
                      (image_title) =>
                        `/portfolio/${hobby_title}/${image_title}`
                    )
                  );
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
                width: 160, // fixed width
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: 1,
                "&:hover": { boxShadow: 3 },
              }}
            >
              <img
                src={image_src}
                alt={`collage-${idx}`}
                style={{
                  width: "100%", // fills the fixed width
                  height: "auto", // adjusts height automatically
                  display: "block",
                  objectFit: "cover",
                }}
                loading="lazy"
              />
            </Box>
          ))}
        </Masonry>
      </Modal>
    </Box>
  );
}
