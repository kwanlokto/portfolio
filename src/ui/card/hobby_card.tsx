"use client";

import {
  Box,
  Card,
  CardContent,
  Grid,
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
      <Grid size={{ xs: 12, sm: 4, md: 3 }}>
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            borderRadius: 2,
            overflow: "hidden",
            cursor: "pointer",
            boxShadow: 2,
            transition: "all 0.25s ease",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: 6,
            },
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Box sx={{ position: "relative", height: 160 }}>
            <Image
              src={
                `/portfolio/hobby/photos/${hobby.src}` ||
                "/default_hobby_image.jpg"
              }
              alt={hobby.title}
              fill
              style={{ objectFit: "cover" }}
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
      </Grid>

      <Modal open={expanded} onClose={() => setExpanded(false)}>
        <MDReader path={`/portfolio/hobby/${hobby.md}.md`} />
      </Modal>
    </>
  );
};
