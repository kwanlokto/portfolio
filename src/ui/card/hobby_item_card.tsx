"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Rating,
  Typography,
} from "@mui/material";

import { HobbyItemType } from "@/lib/hobby";
import Image from "next/image";

interface HobbyItemCardParams {
  hobby_item: HobbyItemType;
  set_selected_md: (md: string) => void;
}

export const HobbyItemCard = ({ hobby_item, set_selected_md }: HobbyItemCardParams) => {
  // Travel/default photos: flat, chrome-less, with a small caption below.
  if (hobby_item.type === "default") {
    return (
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: hobby_item.aspect_ratio,
            borderRadius: 1,
            overflow: "hidden",
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.01)" },
          }}
        >
          <Image
            src={hobby_item.src}
            alt={hobby_item.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 1,
            color: "text.secondary",
            fontSize: "0.8125rem",
            letterSpacing: "-0.005em",
          }}
        >
          {hobby_item.title}
        </Typography>
      </Box>
    );
  }

  // Blog/book entries keep card affordance since they're clickable.
  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        cursor: "pointer",
        transition: "transform 0.25s ease, border-color 0.25s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: "text.secondary",
        },
      }}
    >
      <CardActionArea onClick={() => set_selected_md(hobby_item.md)}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: hobby_item.aspect_ratio,
          }}
        >
          <Image
            src={hobby_item.src}
            alt={hobby_item.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
        <CardContent sx={{ py: 1.25 }}>
          <Typography
            sx={{
              fontSize: "0.9375rem",
              fontWeight: 500,
              letterSpacing: "-0.005em",
              color: "text.primary",
            }}
          >
            {hobby_item.title}
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
              value={hobby_item.rating}
              precision={0.25}
              readOnly
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
