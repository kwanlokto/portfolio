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
  return (
    <Card
      variant="outlined"
      sx={{
        overflow: "hidden",
        bgcolor: "background.paper",
        transition: "transform 220ms ease, border-color 220ms ease",
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

        <CardContent sx={{ textAlign: "center", py: 1, "&:last-child": { pb: 1 } }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {hobby.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
