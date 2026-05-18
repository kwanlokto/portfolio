import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  trailing?: ReactNode;
  mb?: number;
}

export const SectionHeader = ({
  eyebrow,
  title,
  trailing,
  mb = 3,
}: SectionHeaderProps) => {
  return (
    <Box
      sx={{
        mb,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Box>
        {eyebrow && (
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "text.secondary",
              mb: 0.5,
            }}
          >
            {eyebrow}
          </Typography>
        )}
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: "1.5rem", sm: "1.75rem" },
            fontWeight: 600,
            letterSpacing: "-0.018em",
            lineHeight: 1.2,
            color: "text.primary",
          }}
        >
          {title}
        </Typography>
      </Box>
      {trailing}
    </Box>
  );
};
