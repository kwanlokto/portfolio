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
    <Box>
      {/* About Section */}
      <Typography mb={2} variant="h5">
        About Me
      </Typography>
      <Typography pt={1}>
        One of the coolest (and toughest) things I’ve taken on lately is
        learning hockey as an adult. It’s been a mix of falling, getting back
        up, and slowly figuring things out—but it’s been a blast. Every time I
        make a little progress, it reminds me why I love learning new things.
      </Typography>
      <Typography pt={2}>
        Outside the rink, I’m usually hiking, traveling, or checking out new
        places to eat. I love exploring different cultures and taking in new
        views, but I’m just as happy having a chill day playing video games.
        Those moments keep me balanced and recharged for whatever’s next.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={4}>
        {[
          { title: "Traveling", img: "/travel.jpg" },
          { title: "Sports", img: "/sports.jpg" },
        ].map((hobby, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 6 }} key={index}>
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
                  const res = await fetch(
                    `/portfolio/api/images/${hobby.title.toLowerCase()}`
                  );
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
