import {
  Avatar,
  Paper,
  PaperProps,
  Stack,
  Typography,
  TypographyProps,
} from "@mui/material";

import { ReactNode } from "react";

interface SectionInterface extends PaperProps {
  icon?: ReactNode;
  title: string;
  titleColor?: string;
  children: ReactNode;
  titleVariant?: TypographyProps["variant"];
}

export const Section = ({
  icon,
  title,
  titleColor = "info.main",
  children,
  titleVariant = "subtitle1",
  sx,
  ...paperProps
}: SectionInterface) => (
  <Paper sx={{ p: 2, ...sx }} {...paperProps}>
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center">
        {icon && (
          <Avatar
            sx={{
              bgcolor: "transparent",
              color: titleColor,
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
