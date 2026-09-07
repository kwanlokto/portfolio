import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

import { HobbyType } from "@/lib/hobby";
import Image from "next/image";

interface HobbyCardParams {
  hobby: HobbyType;
  on_click: () => void;
}

export const HobbyCard = ({ hobby, on_click }: HobbyCardParams) => {
  // Gaming and Sports have no gallery. The card decides its own interactivity
  // rather than accepting a handler that silently does nothing.
  const is_interactive = hobby.images.length > 0;

  const media = (
    <>
      <Box
        sx={{
          width: "100%",
          height: { xs: 90, sm: 110 },
          position: "relative",
        }}
      >
        <Image
          src={hobby.img}
          alt={hobby.title}
          fill
          sizes="(max-width: 600px) 160px, 220px"
          style={{ objectFit: "cover" }}
        />
      </Box>

      <CardContent
        sx={{ textAlign: "center", py: 1, "&:last-child": { pb: 1 } }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {hobby.title}
        </Typography>
      </CardContent>
    </>
  );

  return (
    <Card
      variant="outlined"
      sx={{
        overflow: "hidden",
        bgcolor: "background.paper",
        transition: "transform 220ms ease, border-color 220ms ease",
        ...(is_interactive && {
          "&:hover": {
            transform: "translateY(-2px)",
            borderColor: "text.secondary",
          },
        }),
      }}
    >
      {is_interactive ? (
        <CardActionArea
          onClick={on_click}
          aria-label={`View ${hobby.title} gallery`}
        >
          {media}
        </CardActionArea>
      ) : (
        media
      )}
    </Card>
  );
};
