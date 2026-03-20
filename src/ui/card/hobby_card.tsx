"use client";

import { Box, Rating, Typography } from "@mui/material";

import Image from "next/image";

import { HobbyImageType } from "@/lib/hobby";

interface HobbyCardParams {
  hobby: HobbyImageType;
  set_selected_md: (md: string) => void;
}

export const HobbyCard = ({ hobby, set_selected_md }: HobbyCardParams) => {
  return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 2,
          cursor: "pointer",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: 6,
          },
        }}
        onClick={() => {
          if (hobby.type === "reading") {
            set_selected_md(hobby.md);
          }
        }}
      >
        {/* Image section */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: hobby.aspect_ratio,
          }}
        >
          <Image
            src={hobby.src}
            alt={hobby.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Box
          sx={{
            p: 1.5,
            bgcolor: "white",
          }}
        >
          <Typography
            variant="subtitle1"
            lineHeight={1.5}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {hobby.title}
          </Typography>

          {/* Rating pinned bottom-right */}
          {hobby.type === "reading" && (
            <Box sx={{ position: "absolute", bottom: 6, right: 8 }}>
              <Rating
                size="small"
                value={hobby.rating}
                precision={0.25}
                readOnly
              />
            </Box>
          )}
        </Box>
      </Box>
  );
};
