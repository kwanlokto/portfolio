"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Rating,
  Typography,
} from "@mui/material";

import Image from "next/image";

interface BookCardProps {
  title: string;
  src: string;
  aspect_ratio: string;
  rating: number;
  on_open: () => void;
}

export const BookCard = ({
  title,
  src,
  aspect_ratio,
  rating,
  on_open,
}: BookCardProps) => {
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
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": { transform: "translateY(-2px)", boxShadow: 6 },
      }}
    >
      <CardActionArea
        onClick={on_open}
        aria-label={`Read my review of ${title}`}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: aspect_ratio,
          }}
        >
          <Image
            src={src}
            alt={title}
            fill
            sizes="(max-width: 600px) 50vw, 25vw"
            style={{ objectFit: "cover" }}
          />
        </Box>
        <CardContent sx={{ py: 1 }}>
          <Typography variant="body1" fontWeight={500}>
            {title}
          </Typography>
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
              value={rating}
              precision={0.25}
              readOnly
              aria-label={`Rated ${rating} out of 5`}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
