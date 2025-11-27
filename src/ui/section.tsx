import {
  Avatar,
  Paper,
  Stack,
  SxProps,
  Theme,
  Typography,
  TypographyProps,
} from "@mui/material";

import { ReactNode } from "react";

interface SectionInterface {
  icon?: ReactNode;
  title: string;
  titleColor?: string;
  children: ReactNode;
  cardSx?: SxProps<Theme>;
  titleVariant?: TypographyProps["variant"];
}

export const Section = ({
  icon,
  title,
  titleColor = "info.main",
  children,
  cardSx,
  titleVariant = "subtitle1",
}: SectionInterface) => (
  <Paper sx={{ p: 2, ...cardSx }}>
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center">
        {icon && (
          <Avatar
            sx={{
              bgcolor: "transparent",
              color: "text.primary",
            }}
          >
            {icon}
          </Avatar>
        )}

        <Typography
          variant={titleVariant}
          color={titleColor}
          fontWeight={700}
          mb={1}
        >
          {title}
        </Typography>
      </Stack>

      {children}
    </Stack>
  </Paper>
);
