import {
  Paper,
  SxProps,
  Theme,
  Typography,
  TypographyProps,
} from "@mui/material";

import { ReactNode } from "react";

interface SectionInterface {
  title: string;
  titleColor?: string;
  children: ReactNode;
  cardSx?: SxProps<Theme>;
  titleVariant?: TypographyProps["variant"];
}

export const Section = ({
  title,
  titleColor = "info.main",
  children,
  cardSx,
  titleVariant = "subtitle1",
}: SectionInterface) => (
  <Paper sx={{ ...cardSx, p: 2 }}>
    <Typography
      variant={titleVariant}
      color={titleColor}
      sx={{ fontWeight: 700, mb: 1 }}
    >
      {title}
    </Typography>
    {children}
  </Paper>
);
