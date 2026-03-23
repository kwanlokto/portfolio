"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Rating,
  Typography,
} from "@mui/material";

import { HobbyImageType } from "@/lib/hobby";
import Image from "next/image";

interface HobbyCardParams {
  hobby: HobbyImageType;
  set_selected_md: (md: string) => void;
}

export const HobbyCard = ({ hobby, set_selected_md }: HobbyCardParams) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        boxShadow: 2,
        flexDirection: "column",
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
      }}
    >
      <CardActionArea
        onClick={() => {
          if (hobby.type === "blog") {
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

        <CardContent sx={{ py: 1 }}>
          <Typography variant="body1" fontWeight={500}>
            {hobby.title}
          </Typography>

          {/* Rating pinned bottom-right */}
          {hobby.type === "blog" && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                mt: 0.5,
              }}
            >
              <Rating
                size="small"
                value={hobby.rating}
                precision={0.25}
                readOnly
              />
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
