"use client";

import {
  Box,
  Card,
  CardContent,
  Rating,
  Typography,
} from "@mui/material";

import Image from "next/image";
import { MDReader } from "@/ui/md_reader";
import { Modal } from "../modal";
import { useState } from "react";
import { HobbyImageType } from "@/lib/hobby";

interface HobbyCardParams {
  hobby: HobbyImageType;
}

export const HobbyCard = ({ hobby }: HobbyCardParams) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          position: "relative",
          display: "block", // important
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: 2,
          aspectRatio: hobby.aspect_ratio,
          transition: "all 0.25s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: 6,
          },
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            src={hobby.src}
            alt={hobby.title}
            fill
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.25), rgba(0,0,0,0))",
            }}
          />
        </Box>

        <CardContent
          sx={{
            flexGrow: 1,
            p: 2,
            pb: "32px !important",
            position: "relative",
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
        </CardContent>
      </Card>

      <Modal open={expanded} onClose={() => setExpanded(false)}>
        {hobby.type === "reading" && <MDReader path={hobby.md} />}
      </Modal>
    </>
  );
};
