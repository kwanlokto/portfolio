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
import { hobby_images, HobbyImageType } from "@/lib/hobby_images";
import { TextSection } from "@/ui/text_section";

export default function Page() {
  const [open, set_open] = useState<boolean>(false);
  const [images, set_images] = useState<HobbyImageType[]>([]);

  return (
    <Box>
      {/* About Section */}
      <Box>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          About Me
        </Typography>
        <Divider sx={{ width: 60, borderBottomWidth: 3, mb: 3 }} />
        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          I&apos;m a developer who loves building clean, efficient, and user-friendly
          web applications. My work focuses on creating meaningful digital
          experiences that are both technically sound and visually polished.
        </Typography>
      </Box>

      <TextSection
        title="My Journey"
        content="I started coding by tinkering with small scripts to automate daily
          tasks — and quickly realized how much I enjoyed turning ideas into
          functional tools. Over time, that curiosity evolved into a career
          focused on crafting scalable web solutions and intuitive UIs."
      />
      <TextSection
        title="How I Work"
        content="I enjoy solving complex problems by breaking them into small, testable
          parts. My development style emphasizes clarity, maintainability, and
          thoughtful design — both in code and user experience. Collaboration is
          also a key part of my process: I love learning from teammates, sharing
          ideas, and refining solutions together."
      />

      <TextSection
        title="Outside of Work"
        content="When I'm not coding, you'll probably find me traveling, photographing
          landscapes, or exploring new hiking trails. These experiences often
          influence how I approach problem-solving — I like finding new
          perspectives and creative routes to reach a goal."
      />

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
                  const loading_images = hobby_images[hobby_title];

                  set_images(
                    loading_images.map((image: HobbyImageType) => {
                      return {
                        src: `/portfolio/${hobby_title}/${image.src}`,
                        aspect_ratio: image.aspect_ratio,
                      };
                    })
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
          pt: 5.5,
          pl: 4.5,
        }}
      >
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
          {images.map((image: HobbyImageType, idx: number) => (
            <Box
              key={idx}
              sx={{
                position: "relative",
                width: 160,
                aspectRatio: image.aspect_ratio,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: 1,
                "&:hover": { boxShadow: 3 },
              }}
            >
              <Image
                src={image.src}
                alt={`collage-${idx}`}
                fill
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </Box>
          ))}
        </Masonry>
      </Modal>
    </Box>
  );
}
