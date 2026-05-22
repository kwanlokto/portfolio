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
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        border: (theme) =>
          `1px solid ${
            theme.palette.mode === "dark"
              ? theme.palette.grey[800]
              : theme.palette.grey[400]
          }`,
        transition: "transform 0.25s ease, box-shadow 0.1s ease",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
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

        <CardContent sx={{ textAlign: "center", p: 0.5 }}>
          <Typography variant="body1" fontWeight={500}>
            {hobby.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
