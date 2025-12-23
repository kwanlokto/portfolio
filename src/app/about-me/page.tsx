"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { HobbyImageType, hobby_images } from "@/lib/hobby_images";

import Image from "next/image";
import { Masonry } from "@mui/lab";
import { Modal } from "@/ui/modal";
import { TextSection } from "@/ui/text_section";
import { useState } from "react";

export default function Page() {
  const current_year = new Date().getFullYear();

  const [open, set_open] = useState<boolean>(false);
  const [images, set_images] = useState<HobbyImageType[]>([]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
        <Divider sx={{ width: 60, borderBottomWidth: 3, mb: 2 }} />
        <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
          I&apos;m a Senior Software Developer focused on React and modern web
          technologies. I care about writing code that&apos;s maintainable and
          building interfaces that feel natural to use.
        </Typography>
      </Box>
      <Divider />
      <TextSection
        title="My Journey"
        content="My first project in high school was a recommendation program with O(m^n) 
          space complexity. It barely worked, but I loved the feeling of making 
          something useful. Years later, I'm still chasing that same feeling — just 
          with less complexity and fewer bugs."
        mb={1}
      />
      <TextSection
        title="How I Work"
        content="I'm convinced that the best code is boring code. When I'm building 
          something, I'd rather spend time making it obvious than clever. I've 
          learned that the real challenge isn't solving the problem once, it's 
          building something that the next person (usually future me) can understand 
          six months later."
        mb={1}
      />
      <Divider />

      <TextSection
        title="Outside of Work"
        content={`When I'm not coding, I'm often out playing hockey,
          which is something I picked up ${current_year - 2021} years ago.
          It's been fun, frustrating, and humbling. I've spent plenty of time falling,
          but every fall has been a small reminder to get back up to keep trying and
          improving. I also love trying new cuisines and experiencing different cultures.
          These experiences keep me curious and help bring a fresh perspective
          to my work.`}
      />

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
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
              }}
            >
              <CardActionArea
                onClick={async () => {
                  const hobby_title = hobby.title.toLowerCase();
                  const loading_images = hobby_images[hobby_title];
                  // If the images we have isn't empty then continue
                  if (loading_images.length > 0) {
                    set_images(
                      loading_images.map((image: HobbyImageType) => {
                        return {
                          src: `/portfolio/${hobby_title}/${image.src}`,
                          aspect_ratio: image.aspect_ratio,
                        };
                      })
                    );
                    set_open(true);
                  }
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

      <Divider sx={{ my: 1 }} />

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
          pt: 6,
          pl: 3,
          pr: 1,
        }}
      >
        <Masonry columns={{ xs: 2, sm: 2, md: 3, lg: 4 }} spacing={2}>
          {images.map((image: HobbyImageType, idx: number) => (
            <Box
              key={idx}
              sx={{
                position: "relative",
                width: "100%",
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
