import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";

import { HobbyType } from "@/lib/hobby";
import Image from "next/image";

interface HobbyCardParams {
  hobby: HobbyType;
  on_click: () => void;
}

export const HobbyCard = ({ hobby, on_click }: HobbyCardParams) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2.5,
        overflow: "hidden",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        transition: "transform 0.25s ease, border-color 0.25s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: "text.secondary",
        },
      }}
    >
      <CardActionArea onClick={on_click}>
        <Box sx={{ width: "100%", height: 110, position: "relative" }}>
          <Image
            src={hobby.img}
            alt={hobby.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>

        <CardContent sx={{ textAlign: "center", py: 1 }}>
          <Typography
            sx={{
              fontSize: "0.9375rem",
              fontWeight: 500,
              letterSpacing: "-0.005em",
              color: "text.primary",
            }}
          >
            {hobby.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
