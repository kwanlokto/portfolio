import { Box, Typography } from "@mui/material";

import { HobbyItemType } from "@/lib/hobby";
import Image from "next/image";

/** A flat, chrome-less travel photo with a caption. Not interactive. */
export const PhotoTile = ({ item }: { item: HobbyItemType }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: item.aspect_ratio,
          borderRadius: 1,
          overflow: "hidden",
          transition: "transform 0.25s ease",
          "&:hover": { transform: "scale(1.01)" },
        }}
      >
        <Image
          src={item.src}
          alt={item.title}
          fill
          sizes="(max-width: 600px) 50vw, 25vw"
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
        {item.title}
      </Typography>
    </Box>
  );
};
